import type { Product } from "../../types/product";
import type { TransactionFormData } from "../../types/transaction";
import TransactionForm from "./TransactionForm";

interface Props {
    open: boolean;
    type: "IN" | "OUT";
    products: Product[];
    onClose: () => void;
    onSubmit: (
        data: TransactionFormData
    ) => void;
}

function TransactionModal({
    open,
    type,
    products,
    onClose,
    onSubmit,
}: Props) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-550px">
                <h2 className="text-2xl font-bold mb-6">
                    {type === "IN"? "Stock In" : "Stock Out"}
                </h2>
                <TransactionForm products={products} onSubmit={onSubmit} />
                <button onClick={onClose} className="mt-5">
                    Close
                </button>
            </div>
        </div>
    );
}

export default TransactionModal;