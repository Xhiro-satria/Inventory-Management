import api from "../lib/axios";
import type {
    CategoryResponse,
    CreateCategoryDto,
} from "../types/category";

class CategoryService {
    async getAll() {
        const response = await api.get<CategoryResponse>(
        "/categories"
        );
        return response.data;
    }

    async create(data: CreateCategoryDto) {
        return await api.post("/categories", data);
    }

    async update(id: number, data: CreateCategoryDto) {
        return await api.put(`/categories/${id}`, data);
    }

    async delete(id: number) {
        return await api.delete(`/categories/${id}`);
    }
}

export default new CategoryService();