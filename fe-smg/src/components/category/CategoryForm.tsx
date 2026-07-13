import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

interface Props {
  defaultValue?: {
    name: string;
    description?: string | null;
  } | null;
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
    formState: { isSubmitting },
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
      className="space-y-5 antialiased"
    >
      <div className="space-y-1.5">
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
          Category Name
        </label>
        <input
          type="text"
          placeholder="E.g., Multimedia Equipment"
          {...register("name", { required: true })}
          disabled={isSubmitting}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
          Description
        </label>
        <textarea
          placeholder="Provide detail information about this category..."
          {...register("description")}
          disabled={isSubmitting}
          rows={4}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 active:bg-zinc-900 text-white rounded-xl px-5 py-2.5 font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={16} className="text-yellow-400" />
              <span>Save Category</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;