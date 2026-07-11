import { Router } from "express";
import transactionController from "../controllers/transaction.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {roleMiddleware} from "../middlewares/role.middleware";

const router = Router();
router.use(authMiddleware);
router.use(roleMiddleware("STAFF", "ADMIN"));
router.post("/in",transactionController.stockIn);
router.post("/out",transactionController.stockOut);
router.get("/export",transactionController.exportExcel);
router.get("/history",transactionController.history);
router.delete("/:id",transactionController.delete);

export default router;