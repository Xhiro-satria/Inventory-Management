import { useForm } from "react-hook-form";
import type { Product } from "../../types/product";
import type { TransactionFormData } from "../../types/transaction";

interface Props {
    products: Product[];
    onSubmit: (data: TransactionFormData) => void;
}

function TransactionForm({
    products,
    onSubmit,
}: Props) {

    const {
        register,
        handleSubmit,
    } = useForm<TransactionFormData>({
        defaultValues: {
            productId: 0,
            quantity: 1,
            note: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
                <label>Product</label>
                <select
                    {...register("productId", {
                        valueAsNumber: true,
                    })}
                    className="border rounded-lg p-3 w-full"
                >
                    <option value={0}>
                        Choose Product
                    </option>
                        {products.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name} (Stock : {item.stock})
                            </option>
                    ))}
                </select>
            </div>
            <div>

            <label>Quantity</label>
            <input
                type="number"
                {...register("quantity", {
                    valueAsNumber: true,
                })}
                className="border rounded-lg p-3 w-full"
            />
            </div>
            <div>
            <label>Note</label>

            <textarea
                {...register("note")}
                className="border rounded-lg p-3 w-full"
            />
            </div>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
                Save
            </button>
        </form>
    );
}

export default TransactionForm;