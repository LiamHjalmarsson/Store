import { Router } from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../../controller/categoryController.js";
import authenicated from "../../../../shared/middlewares/authenicated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllCategories);

router.post("/", createCategory);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
