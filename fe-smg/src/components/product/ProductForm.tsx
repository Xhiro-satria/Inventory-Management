import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Category } from "../../types/category";
import type { ProductFormData } from "../../types/product";
import { Save, UploadCloud } from "lucide-react";

interface Props {
  defaultValue?: ProductFormData;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
}

function ProductForm({
  defaultValue,
  categories,
  onSubmit,
}: Props) {
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      sku: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 0,
      image: null,
    },
  });

  useEffect(() => {
    reset(
      defaultValue ?? {
        sku: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: 0,
        image: null,
      }
    );
    if (defaultValue?.image) {
      if (typeof defaultValue.image === "string") {
        setPreview(`http://localhost:3000/uploads/${defaultValue.image}`);
      } else if (defaultValue.image instanceof File) {
        setPreview(URL.createObjectURL(defaultValue.image));
      }
    } else {
      setPreview("");
    }
  }, [defaultValue, reset]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("image", file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("FORM DATA", data);
        onSubmit(data);
      })}
      className="space-y-6 antialiased"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            SKU Code
          </label>
          <input
            type="text"
            placeholder="E.g., MME-BOX-01"
            {...register("sku")}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Product Name
          </label>
          <input
            type="text"
            placeholder="E.g., Wireless Microphone"
            {...register("name")}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
          Description
        </label>
        <textarea
          placeholder="Provide detailed description of the physical item..."
          {...register("description")}
          disabled={isSubmitting}
          rows={3}
          className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 resize-none disabled:opacity-50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Price (IDR)
          </label>
          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
              required: true,
            })}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Category
          </label>
          <div className="relative">
            <select
              {...register("categoryId", {
                valueAsNumber: true,
              })}
              disabled={isSubmitting}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 appearance-none disabled:opacity-50"
            >
              <option value={0}>Choose Category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
            Initial Stock
          </label>
          <input
            type="number"
            {...register("stock", {
              valueAsNumber: true,
            })}
            disabled={isSubmitting}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 px-4 text-sm text-zinc-900 outline-none transition-all focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400">
          Product Asset Image
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start">
          <label className="sm:col-span-3 border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-zinc-50/50">
            <UploadCloud size={24} className="text-zinc-400" />
            <span className="text-xs font-medium text-zinc-700">Click to upload media file</span>
            <span className="text-[10px] text-zinc-400">PNG, JPG, or WEBP formats allowed</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              disabled={isSubmitting}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="relative w-full aspect-square sm:h-24 sm:w-24 rounded-xl border border-zinc-200 overflow-hidden bg-zinc-50">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-zinc-100">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 active:bg-zinc-900 text-white rounded-xl px-6 py-2.5 font-medium text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={16} className="text-yellow-400" />
              <span>Save Product Asset</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;