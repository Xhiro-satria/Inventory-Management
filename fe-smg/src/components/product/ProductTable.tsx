import type { Product } from "../../types/product";
import { Eye, Edit2, Trash2 } from "lucide-react";

interface Props {
    data: Product[];
    onDetail: (product: Product) => void;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

function ProductTable({
    data,
    onDetail,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="w-full bg-white rounded-2xl border border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden antialiased">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-24">
                    Image
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    SKU
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Product
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Category
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-32">
                    Stock Status
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-right w-44">
                    Actions
                </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
                {data.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-zinc-400 font-light">
                    No products found.
                    </td>
                </tr>
                ) : (
                data.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="py-3 px-6 flex justify-center">
                        <img
                        src={`http://localhost:3000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl border border-zinc-200 bg-zinc-50"
                        />
                    </td>
                    <td className="py-4 px-6 text-sm font-mono text-zinc-500">
                        {item.sku}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-900">
                        {item.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-600">
                        <span className="bg-zinc-100 border border-zinc-200/60 px-2.5 py-1 rounded-md text-xs font-medium">
                        {item.category.name}
                        </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                        <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-mono font-bold border ${
                            item.stock <= 5
                            ? "bg-red-50 text-red-700 border-red-200"
                            : item.stock <= 10
                            ? "bg-yellow-400 text-zinc-950 border-yellow-500"
                            : "bg-zinc-900 text-white border-zinc-950"
                        }`}
                        >
                        {String(item.stock).padStart(2, "0")}
                        </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                        <button
                        onClick={() => onDetail(item)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-all cursor-pointer"
                        title="Detail"
                        >
                        <Eye size={16} />
                        </button>
                        <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-all cursor-pointer"
                        title="Edit"
                        >
                        <Edit2 size={16} />
                        </button>
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

export default ProductTable;