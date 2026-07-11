interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

function LogoutModal({
    open,
    onClose,
    onConfirm,
}: Props) {

    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl shadow-lg p-6 w-[400px]">
            <h2 className="text-2xl font-bold mb-3">
            Logout
            </h2>

            <p className="text-gray-600">
            Apakah Anda yakin ingin logout?
            </p>

            <div className="flex justify-end gap-3 mt-6">

            <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border"
            >
                Batal
            </button>

            <button
                onClick={onConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
                Logout
            </button>
            </div>
        </div>
        </div>
    );
}

export default LogoutModal;