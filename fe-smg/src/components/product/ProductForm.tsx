import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Category } from "../../types/category";
import type { ProductFormData } from "../../types/product";

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
    setValue
} = useForm<ProductFormData>({
    defaultValues: {
        sku: "",
        name: "",
        description: "",
        price: 0,
        stock: 0,
        categoryId: 0,
        image:null,
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
        image:null,
    }
    );
}, [defaultValue, reset]);

const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
) => {

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
      className="space-y-5"
    >

      <div>
        <label>SKU</label>
        <input
          {...register("sku")}
          className="border w-full rounded p-3"
        />
      </div>
      <div>
        <label>Product Name</label>
        <input
          {...register("name")}
          className="border w-full rounded p-3"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          {...register("description")}
          className="border w-full rounded p-3"
        />
      </div>
      <div>
        <label>Price</label>
        <input
            type="number"
            {...register("price", {
                valueAsNumber: true,
                required: true,
            })}
            className="border w-full rounded p-3"
        />
      </div>
      <div>
        <label>Category</label>
        <select
          {...register("categoryId", {
            valueAsNumber: true,
          })}
          className="border w-full rounded p-3">
          <option value={0}>
            Choose Category
          </option>
          {categories.map((item) => (
            <option
              key={item.id}
              value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Stock</label>
        <input
          type="number"
          {...register("stock", {
            valueAsNumber: true,
          })}
          className="border w-full rounded p-3"
        />
      </div>
    <div>
        <label className="block mb-2">
            Product Image
        </label>
        <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="border rounded-lg p-2 w-full"
        />
        {
    preview && (

    <img
        src={preview}
        alt="Preview"
        className="w-36 h-36 object-cover rounded-lg border mt-3"
    />
    )
}
    </div>
      <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
        Save
      </button>
    </form>
  );
}

export default ProductForm;