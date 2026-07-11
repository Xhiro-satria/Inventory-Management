import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";

class DashboardController {
    async summary(req: Request, res: Response) {
        try {
            const data = await dashboardService.getSummary();
            res.status(200).json({
                success: true,
                data,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default new DashboardController();