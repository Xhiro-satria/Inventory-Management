import { Request, Response } from "express";
import inventoryService from "../services/inventory.service";
import { ZodError } from "zod";
import {
    stockInSchema,
    stockOutSchema,
} from "../validators/transaction.validation";

class TransactionController {
    async stockIn(req: Request, res: Response) {
        try {
            const data = stockInSchema.parse(req.body);
            const userId = req.user!.id;
            const product = await inventoryService.stockIn(
                data.productId,
                data.quantity,
                data.note,
                userId
            );

            res.status(201).json({
                success: true,
                message: "Stock berhasil ditambahkan",
                data: product,
            });

        } catch (error: any) {
            if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: error.issues[0].message,
        });
    }

    res.status(400).json({
        success: false,
        message: error.message,
    });
        }
    }

    async stockOut(req: Request, res: Response) {
        try {
            const data = stockOutSchema.parse(req.body);
            const userId = req.user!.id;
            const product = await inventoryService.stockOut(
                data.productId,
                data.quantity,
                data.note,
                userId
            );

            res.status(201).json({
                success: true,
                message: "Stock berhasil dikurangi",
                data: product,
            });

        } catch (error: any) {
            if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues[0].message,
        });
    }

    res.status(400).json({
        success: false,
        message: error.message,
    });
        }

    }

    async history(req: Request, res: Response) {
    try {
        const search = req.query.search as string | undefined;
        const type = req.query.type as "IN" | "OUT" | undefined;
        const history = await inventoryService.history(
            search,
            type
        );

        res.json({
            success: true,
            data: history,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

    async exportExcel(req: Request, res: Response) {
    try {
        const workbook =
            await inventoryService.exportExcel();

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="transactions.xlsx"'
        );
        await workbook.xlsx.write(res);
        res.end();

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

    async delete(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const result =
            await inventoryService.delete(id);
        res.json({
            success: true,
            message: result.message,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
}

export default new TransactionController();