interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName?: string;
}

function DeleteProductModal({
    open,
    onClose,
    onConfirm,
    productName,
}: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-400px">
                <h2 className="text-2xl font-bold mb-5">
                    Delete Product
                </h2>

                <p className="mb-6">
                    Apakah yakin ingin menghapus
                    <span className="font-semibold">
                        {" "}{productName}
                    </span>?
                </p>

                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                        Cancel
                    </button>

                    <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProductModal;