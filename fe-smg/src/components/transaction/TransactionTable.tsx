import type { Transaction } from "../../types/transaction";
import { Trash2 } from "lucide-react";

interface Props {
    data: Transaction[];
    onDelete: (transaction: Transaction) => void;
}

function TransactionTable({
    data,
    onDelete,
}: Props) {
    return (
        <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden antialiased">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-16">
                    No
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Reference
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-28">
                    Type
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Product
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-24">
                    Qty
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Staff
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Date & Time
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-right w-24">
                    Action
                </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
                {data.length === 0 ? (
                <tr>
                    <td colSpan={8} className="py-12 text-center text-sm text-zinc-400 font-light">
                    No transactions recorded.
                    </td>
                </tr>
                ) : (
                data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-mono text-zinc-400 text-center">
                        {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-6 text-sm font-mono font-medium text-zinc-900">
                        {item.reference}
                    </td>
                    <td className="py-4 px-6 text-center">
                        <span
                        className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded text-xs font-mono font-bold border ${
                            item.type === "IN"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}
                        >
                        {item.type}
                        </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-900">
                        {item.product.name}
                    </td>
                    <td className="py-4 px-6 text-sm font-mono font-bold text-center text-zinc-800">
                        {item.quantity}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-600">
                        {item.user.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500 font-mono">
                        {new Date(item.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        })}
                    </td>
                    <td className="py-4 px-6 text-right">
                        <button
                        onClick={() => onDelete(item)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                        title="Delete"
                        >
                        <Trash2 size={16} />
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>
        </div>
    );
}

export default TransactionTable;