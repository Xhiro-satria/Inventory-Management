import type { Category } from "../../types/category";

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

function CategoryDetailModal({
  open,
  onClose,
  category,
}: Props) {
  if (!open || !category) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[500px] p-6">

        <h2 className="text-2xl font-bold mb-6">
          Category Detail
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Category Name</p>
            <p className="font-semibold">{category.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Description</p>
            <p>
              {category.description || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Created At</p>
            <p>
              {new Date(category.createdAt).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Updated At</p>
            <p>
              {new Date(category.updatedAt).toLocaleString()}
            </p>
          </div>

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default CategoryDetailModal;