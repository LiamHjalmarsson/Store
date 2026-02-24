import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenicated from "../../../../shared/middlewares/authenicated.js";

const router = Router();

router.use(authenicated, isAdmin);

export default router;
