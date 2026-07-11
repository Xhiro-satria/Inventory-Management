import type { Transaction } from "../../types/transaction";

interface Props {
    data: Transaction[];
    onDelete: (transaction: Transaction) => void;
}
let i = 1;

function TransactionTable({
    data,
    onDelete,
}: Props) {

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">No</th>
                        <th className="p-3">Reference</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Product</th>
                        <th className="p-3">Qty</th>
                        <th className="p-3">Staff</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}className="border-t">
                            <td className="p-3 text-center">{i}</td>
                            <td className="p-3 text-center">{item.reference}</td>
                            <td className="p-3 text-center">
                                <span
                                    className={`px-3 py-1 rounded-full text-white ${
                                        item.type === "IN"
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                        }`}
                                    >{item.type}
                                </span>
                            </td>
                            <td className="p-3 text-center">{item.product.name}</td>
                            <td className="p-3 text-center">{item.quantity}</td>
                            <td className="p-3 text-center">{item.user.name}</td>
                            <td className="p-3 text-center">{new Date(item.createdAt).toLocaleString("id-ID")}</td>
                            <td className="p-3 text-center">
                                <button onClick={() => onDelete(item)} className="bg-red-600 text-white px-3 py-1 rounded">
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

export default TransactionTable;