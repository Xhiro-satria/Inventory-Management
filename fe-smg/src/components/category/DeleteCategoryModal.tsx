interface Props {
    open: boolean;
    categoryName?: string;
    onClose: () => void;
    onConfirm: () => void;
}

function DeleteCategoryModal({
    open,
    categoryName,
    onClose,
    onConfirm,
    }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white rounded-xl p-6 w-96">
            <h2 className="text-xl font-bold">
            Hapus Category
            </h2>
            <p className="mt-4">
            Apakah yakin ingin menghapus
            <span className="font-bold">
                {" "}
                {categoryName}
            </span>
            ?
            </p>

            <div className="flex justify-end gap-3 mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-300"
                >
                    Batal
                </button>

                <button
                    onClick={onConfirm}
                    className="px-4 py-2 rounded bg-red-600 text-white"
                >
                    Hapus
                </button>
            </div>
        </div>
        </div>
    );
}

export default DeleteCategoryModal;