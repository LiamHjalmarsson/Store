import { Router } from "express";
import creatorPublicRoutes from "./public/creatorRoute.js";
import creatorRoutes from "./authenticated/creatorRoute.js";
import creatorAdminRoutes from "./admin/creatorRoute.js";

const router = Router();

router.use("/creators", creatorPublicRoutes);

router.use("/creators", creatorRoutes);

router.use("/admin/creators", creatorAdminRoutes);

export default router;

