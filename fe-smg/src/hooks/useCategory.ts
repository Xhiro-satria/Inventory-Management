import { useEffect, useState } from "react";
import CategoryService from "../services/category.service";
import type { Category } from "../types/category";

export default function useCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
        const response = await CategoryService.getAll();
        setCategories(response.data);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        loading,
        getCategories,
    };
}