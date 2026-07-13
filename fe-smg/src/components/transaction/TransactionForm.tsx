import { useForm } from "react-hook-form";
import type { Product } from "../../types/product";
import type { TransactionFormData } from "../../types/transaction";
import { Save } from "lucide-react";

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
        formState: { isSubmitting },
    } = useForm<TransactionFormData>({
        defaultValues: {
        productId: 0,
        quantity: 1,
        note: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 antialiased">
        <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Product Item
            </label>
            <select
            {...register("productId", {
                valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 appearance-none disabled:opacity-50"
            >
            <option value={0}>Choose Product</option>
            {products.map((item) => (
                <option key={item.id} value={item.id}>
                {item.name} (Available Stock: {item.stock})
                </option>
            ))}
            </select>
        </div>

        <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Transaction Quantity
            </label>
            <input
            type="number"
            min={1}
            {...register("quantity", {
                valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50"
            />
        </div>

        <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Additional Note
            </label>
            <textarea
            placeholder="Write internal log description here..."
            {...register("note")}
            disabled={isSubmitting}
            rows={3}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 resize-none disabled:opacity-50"
            />
        </div>

        <div className="flex justify-end pt-2">
            <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 active:bg-zinc-900 text-white rounded-xl px-5 py-2.5 font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
            {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                <Save size={16} className="text-yellow-400" />
                <span>Log Transaction</span>
                </>
            )}
            </button>
        </div>
        </form>
    );
}

export default TransactionForm;