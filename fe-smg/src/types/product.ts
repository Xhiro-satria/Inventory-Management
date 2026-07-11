export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image: string | null;

  categoryId: number;

  category: {
    id: number;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
}

export interface CreateProductDto {
  sku: string;
  name: string;
  description: string;
  price:number;
  stock: number;
  categoryId: number;
  image?: string;
}

export interface ProductFormData {
  sku: string;
  name: string;
  description: string;
  price:number;
  stock: number;
  categoryId: number;
  image?: File | null;
}