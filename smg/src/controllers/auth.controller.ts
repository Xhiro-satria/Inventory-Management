import { Request, Response } from "express";
import authService from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const data = registerSchema.parse(req.body);
            const user = await authService.register(data);
            res.status(201).json({
                success: true,
                message: "Register berhasil",
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = loginSchema.parse(req.body);
            const result = await authService.login(data);
            res.json({
                success: true,
                message: "Login berhasil",
                data: result,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new AuthController();