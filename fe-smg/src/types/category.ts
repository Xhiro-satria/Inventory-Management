export interface Category {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponse {
    success: boolean;
    data: Category[];
}

export interface CreateCategoryDto {
    name: string;
    description: string;
}