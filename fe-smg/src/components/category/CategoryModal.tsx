import type { Category } from "../../types/category";
import CategoryForm from "./CategoryForm";
import { X } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { 
        name: string;
        description: string 
    }) => void;
    category?: Category | null;
}

function CategoryModal({
    open,
    onClose,
    onSubmit,
    category,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 antialiased">
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-md overflow-hidden relative flex flex-col">
            
            <div className="bg-zinc-950 px-6 py-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
            <div>
                <h2 className="text-base font-bold text-white tracking-tight uppercase">
                {category ? "Modify Category" : "Create Category"}
                </h2>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                {category ? `ID: ${category.id}` : "System Registry"}
                </p>
            </div>
            <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
            >
                <X size={16} />
            </button>
            </div>

            <div className="p-6 overflow-y-auto">
            <CategoryForm defaultValue={category} onSubmit={onSubmit} />
            </div>

            <div className="bg-zinc-50 px-6 py-4 flex justify-start border-t border-zinc-200/60 shrink-0">
            <button 
                onClick={onClose} 
                className="text-zinc-500 hover:text-zinc-900 font-medium text-sm transition-colors cursor-pointer"
            >
                Cancel
            </button>
            </div>

        </div>
        </div>
    );
}

export default CategoryModal;