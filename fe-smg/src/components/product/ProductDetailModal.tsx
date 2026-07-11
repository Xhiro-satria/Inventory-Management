import type { Product } from "../../types/product";

interface Props {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

function ProductDetailModal({
    open,
    onClose,
    product,
}: Props) {
    if (!open || !product) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl w-700px p-6">
                <h2 className="text-2xl font-bold mb-6">
                    Product Detail
                </h2>
                <div className="flex gap-6">
                    <img src={`http://localhost:3000/uploads/${product.image}`} className="w-56 h-56 rounded-lg object-cover border"/>
                    <div className="flex-1 space-y-3">
                        <div>
                            <p className="text-gray-500">
                                Product Name
                            </p>
                            <h3 className="text-xl font-semibold">
                                {product.name}
                            </h3>
                        </div>
                        <div>
                            <p className="text-gray-500">SKU</p>
                            <p>{product.sku}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Category</p>
                            <p>{product.category.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Price</p>
                            <p>Rp {product.price.toLocaleString("id-ID")}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Stock</p>
                            <p>{product.stock}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold mb-2">
                        Description
                    </h3>

                    <div className="border rounded-lg p-4 bg-gray-50 min-h-120px">
                        {product.description || "-"}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="bg-gray-700 text-white px-5 py-2 rounded-lg">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailModal;