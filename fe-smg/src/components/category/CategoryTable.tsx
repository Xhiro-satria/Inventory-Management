import type { Category } from "../../types/category";
import { Eye, Edit2, Trash2 } from "lucide-react";

interface Props {
    data: Category[];
    onDetail: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}

function CategoryTable({
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
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 w-16 text-center">
                    No
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Category Name
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Date Created
                </th>
                <th className="py-4 px-6 text-xs font-mono uppercase tracking-widest text-zinc-400 text-center w-44">
                    Actions
                </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
                {data.length === 0 ? (
                <tr>
                    <td colSpan={4} className="py-12 text-center text-sm text-zinc-400 font-light">
                    No categories found.
                    </td>
                </tr>
                ) : (
                data.map((item, index) => (
                    <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors group">
                    <td className="py-4 px-6 text-sm font-mono text-zinc-400 text-center">
                        {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-900">
                        {item.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500 font-mono">
                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                        })}
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

export default CategoryTable;