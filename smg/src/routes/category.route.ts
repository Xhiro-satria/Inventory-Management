import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import categoryController from "../controllers/category.controller";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/",authMiddleware, roleMiddleware("ADMIN"), categoryController.create);
router.get("/",authMiddleware, categoryController.findAll);
router.get("/:id",authMiddleware, categoryController.findById);
router.put("/:id",authMiddleware, roleMiddleware("ADMIN"), categoryController.update);
router.delete("/:id",authMiddleware, roleMiddleware("ADMIN"), categoryController.delete);

export default router;