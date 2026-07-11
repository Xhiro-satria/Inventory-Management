import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const roleMiddleware = (...role:string[]) => {
    return(req: AuthRequest, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(401).json({
                success:false,
                message: "Unauthorized"
            })
        }

        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Anda tidak memiliki akses",
            });
        }
        next()
    }
}