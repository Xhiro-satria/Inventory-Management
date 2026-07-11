import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  defaultValue?: {
    name: string;
    description?: string | null;
  }|null;

  onSubmit: (data: {
    name: string;
    description: string;
  }) => void;
}

function CategoryForm({ defaultValue, onSubmit }: Props) {
    type CategoryFormData = {
    name: string;
    description: string;
    };

    const {
    register,
    handleSubmit,
    reset,
    } = useForm<CategoryFormData>({
    defaultValues: {
        name: "",
        description: "",
    },
    });

  useEffect(() => {
    reset({
      name: defaultValue?.name ?? "",
      description: defaultValue?.description ?? "",
    });
  }, [defaultValue, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2">
          Category Name
        </label>

        <input
          {...register("name")}
          className="border w-full rounded-lg p-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Description
        </label>

        <textarea
          {...register("description")}
          className="border rounded-lg w-full p-3"
          rows={4}
        />
      </div>

      <button className="bg-blue-600 text-white px-5 py-2 rounded">
        Save
      </button>
    </form>
  );
}

export default CategoryForm;