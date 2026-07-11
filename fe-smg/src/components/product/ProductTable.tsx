import type { Product } from "../../types/product";

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
        <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-3">Image</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Action</th>
            </tr>
        </thead>

        <tbody>
            {data.map((item) => (
                <tr key={item.id}className="border-t">
                    <td className="p-3"><img src={`http://localhost:3000/uploads/${item.image}`}className="w-16 h-16 object-cover rounded text-center"/></td>
                    <td className="p-3 text-center">{item.sku}</td>
                    <td className="p-3 text-center">{item.name}</td>
                    <td className="p-3 text-center">{item.category.name}</td>
                    <td className="p-3 text-center">
                        <span
                            className={`px-3 py-1 rounded-full text-white
                            ${
                            item.stock<=5
                            ?"bg-red-600"
                            :item.stock<=10
                            ?"bg-yellow-500"
                            :"bg-green-600"}`}>
                            {item.stock}
                        </span>
                    </td>
                    <td className="space-x-1 text-center">
                        <button onClick={() => onDetail(item)} className="bg-blue-600 text-white px-3 py-1 rounded text-center">
                            Detail
                        </button>
                        <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-3 py-1 rounded text-center">
                            Edit
                        </button>
                        <button onClick={() => onDelete(item)} className="bg-red-600 text-white px-3 py-1 rounded text-center">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}

export default ProductTable;