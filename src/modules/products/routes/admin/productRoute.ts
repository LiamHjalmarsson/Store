import { Router } from "express";
import { isAdmin } from "../../../../middlewares/isAdmin.js";
import authenicated from "../../../../middlewares/authenicated.js";
import { getAllSubcategories } from "../../controller/productController.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllSubcategories);

export default router;
