import { Response } from "express";
import inventoryService from "../services/inventory.service";
import { inventorySchema } from "../validators/inventory.validator";
import { AuthRequest } from "../middlewares/auth.middleware";

class InventoryController {
    async stockIn(req: AuthRequest, res:Response){
        try{
            const data = inventorySchema.parse(req.body)
            const result = await inventoryService.stockIn(
                data.productId,
                data.quantity,
                data.note,
                req.user!.id
            )
            res.status(200).json({
                success: true,
                message: "Barang sukses masuk",
                data : result
            })
        }catch(error:any){
            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    }

    async stockOut(req: AuthRequest, res: Response) {
        try {
            const data = inventorySchema.parse(req.body);
            const result = await inventoryService.stockOut(
                data.productId,
                data.quantity,
                data.note,
                req.user!.id
            );

            res.status(200).json({
                success: true,
                message: "Barang keluar berhasil",
                data: result,
            });
        }catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    async history(req: AuthRequest, res: Response) {
        const transactions = await inventoryService.history();
        res.json({
            success: true,
            data: transactions,
        });
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
}
export default new InventoryController();