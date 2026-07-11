import api from "../lib/axios";
import type { ProductFormData } from "../types/product";

class ProductService {
    async getAll(
    search?: string,
    category?: number
) {

    const params = new URLSearchParams();
    if (search) {
        params.append("search", search);
    }
    if (category) {
        params.append("category", String(category));
    }
    const response = await api.get(
        `/products?${params.toString()}`
    );
    return response.data;
}

    async create(data: ProductFormData) {
        const formData = new FormData();
        formData.append("sku", data.sku);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("categoryId", String(data.categoryId));

        if (data.image) {
            formData.append("image", data.image);
        }

        const response = await api.post(
            "/products",
            formData
        );
        return response.data;
    }

    async update(id: number, data: ProductFormData) {
        const formData = new FormData();
        formData.append("sku", data.sku);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("stock", String(data.stock));
        formData.append("categoryId", String(data.categoryId));

        if (data.image) {
            formData.append("image", data.image);
        }

        const response = await api.put(
            `/products/${id}`,
            formData
        );
        return response.data;
    }

    async delete(id: number) {
        return api.delete(`/products/${id}`);
    }

}

export default new ProductService();