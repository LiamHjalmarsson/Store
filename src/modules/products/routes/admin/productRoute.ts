import { Router } from "express";
import { isAdmin } from "../../../../middlewares/isAdmin.js";
import authenicated from "../../../../middlewares/authenicated.js";

const router = Router();

router.use(authenicated, isAdmin);

export default router;
