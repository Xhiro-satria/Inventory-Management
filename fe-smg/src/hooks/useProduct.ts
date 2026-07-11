import { useEffect, useState } from "react";
import ProductService from "../services/product.service";
import type { Product } from "../types/product";

export default function useProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const getProducts = async (
    search?: string,
    category?: number
) => {
    try {
        const response =
            await ProductService.getAll(
                search,
                category
            );
        setProducts(response.data);
    } finally {
        setLoading(false);
    }

};
    useEffect(() => {
        getProducts();
    }, []);

    return {
        products,
        loading,
        getProducts,
    };
}