import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { getAllSubcategories } from "../../controller/subcategoryController.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllSubcategories);

export default router;
