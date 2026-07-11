import { useState } from "react";
import CategoryTable from "../../components/category/CategoryTable";
import useCategory from "../../hooks/useCategory";
import type { Category } from "../../types/category";
import CategoryModal from "../../components/category/CategoryModal";
import CategoryService from "../../services/category.service";
import toast from "react-hot-toast";
import DeleteCategoryModal from "../../components/category/DeleteCategoryModal";
import CategoryDetailModal from "../../components/category/CategoryDetailModal";

function CategoryPage() {
    const [open,setOpen]=useState(false);
    const { categories, loading, getCategories } = useCategory();
    const [search, setSearch] = useState("");
    const filtered = categories.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedDelete, setSelectedDelete] =
    useState<Category | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] =
    useState<Category | null>(null);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className="space-y-5">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
            Category
            </h1>

            <button onClick={() => {setSelectedCategory(null); setOpen(true);}} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                + Add Category
            </button>
        </div>

        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-3 rounded-lg w-80"
        />

        <CategoryTable
            data={filtered}

            onDetail={(category: Category) => {
                setSelectedDetail(category);
                setDetailOpen(true);
            }}

            onEdit={(category: Category) => {
                setSelectedCategory(category);
                setOpen(true);
            }}

            onDelete={(category: Category) => {
                setSelectedDelete(category);
                setDeleteOpen(true);
            }}
        />

        <CategoryModal
            open={open}
            category={selectedCategory}
            onClose={() =>{ setOpen(false); setOpen(false);}}
            onSubmit={async (data) => {
                try {
                    if (selectedCategory) {
                    await CategoryService.update(selectedCategory.id, data);

                    toast.success("Category berhasil diupdate");
                    } else {
                    await CategoryService.create(data);

                    toast.success("Category berhasil ditambahkan");
                    }

                    setOpen(false);
                    setSelectedCategory(null);

                    await getCategories();
                } catch (error) {
                    toast.error("Terjadi kesalahan");
                }
                }}
            />

            <DeleteCategoryModal
                open={deleteOpen}
                categoryName={selectedDelete?.name}
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedDelete(null);
                }}
                onConfirm={async () => {
                    if (!selectedDelete) return;
                    try {
                        await CategoryService.delete(selectedDelete.id);
                        toast.success("Category berhasil dihapus");
                        setDeleteOpen(false);
                        setSelectedDelete(null);
                        await getCategories();
                    } catch {
                        toast.error("Gagal menghapus category");
                    }
                }}
            />

            <CategoryDetailModal
                open={detailOpen}
                category={selectedDetail}
                onClose={() => {
                    setDetailOpen(false);
                    setSelectedDetail(null);
                }}
            />
        </div>
    );
}

export default CategoryPage;