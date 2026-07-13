import type { Product } from "../../types/product";
import { X, Tag, BarChart3, Wallet, Hash } from "lucide-react";

interface Props {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

function ProductDetailModal({ open, onClose, product }: Props) {
    if (!open || !product) return null;

    return (
        <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 antialiased">
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl w-full max-w-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            
            <div className="bg-zinc-950 px-6 py-5 flex items-center justify-between border-b border-zinc-800 shrink-0">
            <div>
                <h2 className="text-base font-bold text-white tracking-tight uppercase">
                Product Specification
                </h2>
                <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                ID: {product.id}
                </p>
            </div>
            <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 flex items-center justify-center transition-colors cursor-pointer"
            >
                <X size={16} />
            </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-48 sm:h-48 aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-50 shrink-0 shadow-inner">
                <img 
                    src={`http://localhost:3000/uploads/${product.image}`} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 border-b border-zinc-100 pb-3">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Product Name</p>
                    <h3 className="text-lg font-bold text-zinc-900 mt-0.5">{product.name}</h3>
                </div>

                <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 mt-0.5">
                    <Hash size={14} />
                    </div>
                    <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">SKU Code</p>
                    <p className="text-sm font-mono font-medium text-zinc-800 mt-0.5">{product.sku}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 mt-0.5">
                    <Tag size={14} />
                    </div>
                    <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Category</p>
                    <p className="text-sm font-semibold text-zinc-800 mt-0.5">{product.category.name}</p>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 mt-0.5">
                    <Wallet size={14} />
                    </div>
                    <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Price Rate</p>
                    <p className="text-sm font-bold text-zinc-900 mt-0.5">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    </div>
                </div>

                <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 mt-0.5">
                    <BarChart3 size={14} />
                    </div>
                    <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Current Stock</p>
                    <span 
                        className={`inline-block text-xs font-mono font-bold border px-2 py-0.5 rounded mt-1 ${
                        product.stock <= 5 
                            ? "bg-red-50 text-red-700 border-red-200" 
                            : product.stock <= 10 
                            ? "bg-yellow-400 text-zinc-950 border-yellow-500" 
                            : "bg-zinc-900 text-white border-zinc-950"
                        }`}
                    >
                        {product.stock} Units
                    </span>
                    </div>
                </div>
                </div>
            </div>

            <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Technical Description
                </h4>
                <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50/50 text-sm text-zinc-600 font-light leading-relaxed min-h-[100px]">
                {product.description || "No narrative description provided for this asset inventory item."}
                </div>
            </div>
            </div>

            <div className="bg-zinc-50 px-6 py-4 flex justify-end border-t border-zinc-200/60 shrink-0">
            <button 
                onClick={onClose} 
                className="bg-zinc-950 hover:bg-zinc-800 active:bg-zinc-900 text-white font-medium text-sm px-5 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
                close
            </button>
            </div>

        </div>
        </div>
    );
}

export default ProductDetailModal;