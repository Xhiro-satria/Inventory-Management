import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),
    sku: z.string().min(3),
    description: z.string().optional(),
    price: z.coerce.number().positive(),
    stock: z.coerce.number().int().min(0),
    categoryId: z.coerce.number().int().positive(),
    
});

export const updateProductSchema = createProductSchema;