import { Router } from "express";
import authRoute from "./auth.route";
import categoryRoute from "./category.route"
import productRoute from "./product.route"
import inventoryRoute from "./inventory.route";
import userRoute from "./user.route"
import dashboardRoute from "./dashboard.route"
import transactionRoute from "./transaction.route"

const router = Router();

router.use("/auth", authRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute)
router.use("/inventory", inventoryRoute);
router.use("/users", userRoute)
router.use("/dashboard", dashboardRoute)
router.use("/transactions", transactionRoute);

export default router;