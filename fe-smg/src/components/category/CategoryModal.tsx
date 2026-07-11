import type { Category } from "../../types/category";
import CategoryForm from "./CategoryForm";

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
    }:Props){

    if(!open) return null;
    return(
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl p-6 w-96">
                <h2 className="text-xl font-bold mb-5">{category ? "Edit Category" : "Tambah Category"}</h2>
                <CategoryForm defaultValue={category} onSubmit={onSubmit} />
                <button onClick={onClose}className="mt-5">Close</button>
            </div>
        </div>
    )
}

export default CategoryModal;