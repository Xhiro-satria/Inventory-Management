import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(3, "Nama minimal 5 karakter"),

    email: z
        .string()
        .email("Email tidak valid"),
});