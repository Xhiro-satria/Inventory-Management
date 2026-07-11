import {z} from "zod";

export const createCategorySchema = z.object({
    name:z  
        .string()
        .min(5, "minimal 5 karakter")
        .max(100),
    description:z.string().optional(),
})

export const updateCategorySchema = createCategorySchema