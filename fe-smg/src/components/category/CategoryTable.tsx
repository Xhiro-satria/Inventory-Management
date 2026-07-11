import type { Category } from "../../types/category";

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
        <table className="w-full bg-white rounded-xl overflow-hidden shadow">
            <thead className="bg-slate-100">
                <tr>
                    <th className="p-3">No</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id} className="border-b">
                        <td className="text-center p-3">{index + 1}</td>
                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="space-x-2 text-center">
                            <button
                                onClick={() => onDetail(item)}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Detail
                            </button>
                            <button
                                onClick={() => onEdit(item)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(item)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CategoryTable;