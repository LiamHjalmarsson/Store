import { Router } from "express";
import categoryRoutes from "./public/categoryRoute.js";
import categoryAdminRoutes from "./admin/categoryRoute.js";

const router = Router();

router.use("/categories", categoryRoutes);

router.use("/admin/categories", categoryAdminRoutes);

export default router;
