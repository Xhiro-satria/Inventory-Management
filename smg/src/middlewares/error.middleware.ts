import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
    ) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: err.issues[0].message,
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}