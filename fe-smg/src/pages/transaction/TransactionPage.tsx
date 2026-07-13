import useTransaction from "../../hooks/useTransaction";
import TransactionTable from "../../components/transaction/TransactionTable";
import { useState } from "react";
import toast from "react-hot-toast";
import useProduct from "../../hooks/useProduct";
import TransactionModal from "../../components/transaction/TransactionModal";
import TransactionService from "../../services/transaction.service";
import type { Transaction } from "../../types/transaction";

function InventoryPage() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"IN" | "OUT">("IN");
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const { products } = useProduct();
    const {transactions,loading,getTransactions,} = useTransaction();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<"" | "IN" | "OUT">("");
    const handleExport = async () => {
        try {
            const blob = await TransactionService.exportExcel();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "transactions.xlsx";
            link.click();
            window.URL.revokeObjectURL(url);
            toast.success("Export berhasil");
        } catch {
            toast.error(
                "Export gagal"
            );
        }
    };
    
    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-y-yellow-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-xs tracking-widest text-zinc-400 uppercase font-mono">Mengenkripsi Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold">
        Transaction
    </h1>
    <div className="flex gap-3">
        <button
            onClick={() => {
                setType("IN");
                setOpen(true);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
            + Stock In
        </button>
        <button
            onClick={() => {
                setType("OUT");
                setOpen(true);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
            - Stock Out
        </button>
    </div>
</div>
            <div className="flex gap-4 mb-5">
    <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={async (e) => {
            const value = e.target.value;
            setSearch(value);
            await getTransactions(
                value,
                typeFilter || undefined
            );
        }}
        className="border rounded-lg p-3 w-80"
    />

    <select
        value={typeFilter}
        onChange={async (e) => {
            const value = e.target.value as
                "" | "IN" | "OUT";
            setTypeFilter(value);
            await getTransactions(
                search,
                value || undefined
            );
        }}
        className="border rounded-lg p-3"
    >
        <option value="">
            All Type
        </option>
        <option value="IN">
            Stock In
        </option>
        <option value="OUT">
            Stock Out
        </option>
    </select>
</div>

            <TransactionTable
                data={transactions}
                onDelete={(item) => {
                    setSelectedTransaction(item);
                }}
            />
            <TransactionModal
                open={open}
                type={type}
                products={products}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
                    try {
                        if (type === "IN") {
                            await TransactionService.stockIn(data);
                            toast.success("Stock berhasil ditambahkan");
                        } else {
                            await TransactionService.stockOut(data);
                            toast.success("Stock berhasil dikurangi");
                        }
                        setOpen(false);
                        await getTransactions();
                    } catch (error: any) {
                        toast.error(
                            error.response?.data?.message ||
                            "Terjadi kesalahan"
                        );
                    }
                }}
            />
            {
    selectedTransaction && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-400px">
                <h2 className="text-xl font-bold mb-4">
                    Delete Transaction
                </h2>
                <p>
                    Yakin ingin menghapus transaksi ini?
                </p>
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setSelectedTransaction(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={async () => {
                            try {
                                await TransactionService.delete(
                                    selectedTransaction.id
                                );
                                toast.success(
                                    "Transaksi berhasil dihapus"
                                );
                                setSelectedTransaction(null);
                                await getTransactions();
                            } catch (error: any) {
                                toast.error(
                                    error.response?.data?.message ||
                                    "Gagal menghapus transaksi"
                                );
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
            <button
                onClick={handleExport}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg ">
                Export Excel
            </button>
        </div>

    );

}

export default InventoryPage;