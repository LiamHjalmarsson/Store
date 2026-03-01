import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";

const router = Router();

router.use(authenticated, isAdmin);

export default router;
