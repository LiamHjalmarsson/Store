import { Router } from "express";
import achievementRoutes from "./authenticated/achievementRoute.js";
import achievementAdminRoutes from "./admin/achievementRoute.js";

const router = Router();

router.use("/achievements", achievementRoutes);

router.use("/admin/achievements", achievementAdminRoutes);

export default router;
