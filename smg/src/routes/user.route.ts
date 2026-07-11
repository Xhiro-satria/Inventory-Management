import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

router.get("/profile",authMiddleware,userController.profile);
router.put("/profile",authMiddleware,userController.updateProfile);
router.get("/",authMiddleware,roleMiddleware(Role.ADMIN),userController.findAll);
router.patch("/:id/role",authMiddleware,roleMiddleware(Role.ADMIN),userController.updateRole);

export default router;