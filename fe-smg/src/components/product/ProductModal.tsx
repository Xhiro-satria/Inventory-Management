import type { Product,ProductFormData } from "../../types/product";
import ProductForm from "./ProductForm";
import type { Category } from "../../types/category";

interface Props {
    open: boolean;
    onClose: () => void;
    categories: Category[];
    product?:Product|null;
    onSubmit: (
        data: ProductFormData
    ) => void;
}

function ProductModal({
  open,
  onClose,
  categories,
  product,
  onSubmit,
}: Props) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w: 650px">
        <h2 className="text-2xl font-bold mb-5">
            + Add Product
        </h2>

        <ProductForm
            defaultValue={
                product
                    ? {
                        sku: product.sku,
                        name: product.name,
                        description: product.description ?? "",
                        price: product.price,
                        stock: product.stock,
                        categoryId: product.categoryId,
                        image: null,
                    }
                    : undefined
            }
            categories={categories}
            onSubmit={onSubmit}
        />

        <button onClick={onClose} className="mt-5">
          Close
        </button>
      </div>
    </div>
  );
}

export default ProductModal;