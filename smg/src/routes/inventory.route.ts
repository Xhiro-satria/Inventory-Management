import { Router } from "express";
import inventoryController from "../controllers/inventory.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/in", authMiddleware, roleMiddleware("ADMIN", "STAFF"), inventoryController.stockIn);
router.post("/out", authMiddleware, roleMiddleware("ADMIN", "STAFF"), inventoryController.stockOut);
router.get("/history", authMiddleware,roleMiddleware("ADMIN", "STAFF"), inventoryController.history);

export default router;