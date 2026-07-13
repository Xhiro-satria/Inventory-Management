import { useState } from "react";
import  toast  from "react-hot-toast";

import useProduct from "../../hooks/useProduct";
import useCategory from "../../hooks/useCategory";

import ProductTable from "../../components/product/ProductTable";
import ProductModal from "../../components/product/ProductModal";
import type { Product } from "../../types/product";
import ProductService from "../../services/product.service";
import ProductDetailModal from "../../components/product/ProductDetailModal";
import DeleteProductModal from "../../components/product/DeleteProductModal";

function ProductPage() {
    const {products,loading,getProducts,} = useProduct();
    const { categories } = useCategory();    
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] =useState<Product | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedDelete, setSelectedDelete] =useState<Product | null>(null);
    const [search, setSearch] = useState("");
    
    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-y-yellow-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-xs tracking-widest text-zinc-400 uppercase font-mono">Mengenkripsi Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
        <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
            Product
        </h1>

        <button
            onClick={() => {
                setSelectedProduct(null);
                setOpen(true);
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
            + Add Product
        </button>

        </div>
            <div className="mb-5">

        <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={async (e) => {
                const value = e.target.value;
                setSearch(value);
                await getProducts(value);
            }}
            className="border rounded-lg p-3 w-80"
        />

        </div>

        <ProductTable
            data={products}
            onDetail={(product) => {
                setSelectedDetail(product);
                setDetailOpen(true);
            }}
            onEdit={(product) => {
                setSelectedProduct(product);
                setOpen(true);
            }}
            onDelete={(product) => {
                setSelectedDelete(product);
                setDeleteOpen(true);
            }}

            />
            <ProductModal
                open={open}
                categories={categories}
                product={selectedProduct}
                onClose={() => setOpen(false)}
                onSubmit={async (data) => {
            try {
                if (selectedProduct) {
                await ProductService.update(
                    selectedProduct.id,
                    data
                );
                toast.success("Product berhasil diupdate");
                } else {
                    await ProductService.create(data);
                    toast.success("Product berhasil ditambahkan");
                }
                setOpen(false);
                setSelectedProduct(null);
                await getProducts();
            } catch (error:any) {
                console.log(error.response?.data);
                toast.error(
                error.response?.data?.message ||
                "Terjadi kesalahan"
            );
            }
            
                }}
            />
            <ProductDetailModal
                open={detailOpen}
                product={selectedDetail}
                onClose={() => {
                    setDetailOpen(false);
                    setSelectedDetail(null);
                }}
            />
            <DeleteProductModal
                open={deleteOpen}
                productName={selectedDelete?.name}
                onClose={() => {
                    setDeleteOpen(false);
                    setSelectedDelete(null);
                }}
                onConfirm={async () => {
                    if (!selectedDelete) return;
                    try {
                        await ProductService.delete(
                            selectedDelete.id
                        );
                        toast.success(
                            "Product berhasil dihapus"
                        );
                        setDeleteOpen(false);
                        setSelectedDelete(null);
                        await getProducts();
                    } catch {
                        toast.error(
                            "Gagal menghapus product"
                        );
                    }
                }}
            />
        </div>
        );
}

export default ProductPage;