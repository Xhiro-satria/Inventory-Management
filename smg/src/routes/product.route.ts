import { Router } from "express";
import productController from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import upload from "../middlewares/upload.middleware";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("ADMIN"), upload.single("image"), productController.create);
router.get("/", authMiddleware, productController.findAll);
router.get("/:id", authMiddleware, productController.findById);
router.put("/:id", authMiddleware, roleMiddleware("ADMIN"),upload.single("image"), productController.update);
router.delete("/:id", authMiddleware, roleMiddleware("ADMIN"), productController.delete);

export default router;