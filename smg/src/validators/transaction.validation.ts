import { z } from "zod";

export const stockInSchema = z.object({
    productId: z.coerce.number().positive(),
    quantity: z.coerce.number().min(1, "Jumlah minimal 1"),
    note: z.string().optional(),
});

export const stockOutSchema = z.object({
    productId: z.coerce.number().positive(),
    quantity: z.coerce.number().min(1, "Jumlah minimal 1"),
    note: z.string().optional(),
});