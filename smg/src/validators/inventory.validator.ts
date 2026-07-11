import { z } from "zod";

export const inventorySchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    note: z.string().optional(),
});