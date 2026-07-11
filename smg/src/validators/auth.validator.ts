import {z} from "zod";

export const registerSchema = z.object({
    name:z
        .string()
        .min(6, "minimal 6 karakter boss")
        .max(20, "max cuma 20 ygy"),
    email:z
        .email("format email tidak valid"),
    password: z
        .string()
        .min(6, "Password minimal 6 karakter"),
})

export const loginSchema = z.object({
    email: z.email("Format email tidak valid"),

    password: z
        .string()
        .min(6, "Password minimal 6 karakter"),
});