import { Request, Response } from "express";
import userService from "../services/user.service";
import { updateRoleSchema } from "../validators/user.validator";
import { updateProfileSchema } from "../validators/profile.validator";

class UserController {
    async findAll(req: Request, res: Response) {
        const users = await userService.findAll();
            res.json({
            success: true,
            data: users,
        });
    }

    async updateRole(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = updateRoleSchema.parse(req.body);
            const user = await userService.updateRole(id, data.role);
            res.json({
                success: true,
                message: "Role berhasil diubah",
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async profile(req: Request, res: Response) {
        try {
            const user =
                await userService.profile(
                    req.user!.id
                );
            res.json({
                success: true,
                data: user,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async updateProfile(
        req: Request,
        res: Response
    ) {
        try {
            const data =
                updateProfileSchema.parse(
                    req.body
                );
            const user =
                await userService.updateProfile(
                    req.user!.id,
                    data
                );
            res.json({
                success: true,
                message:"Profile berhasil diupdate",
                data: user,
            });

        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new UserController();