import { Router } from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../../controllers/category/categoryController.js";
import authenicated from "../../middlewares/authenicated.js";
import { isAdmin } from "../../middlewares/isAdmin.js";

const router = Router();

router.get("/", getAllCategories);

router.post("/", authenicated, isAdmin, createCategory);

router.get("/:id", getCategory);

router.put("/:id", authenicated, isAdmin, updateCategory);

router.delete("/:id", authenicated, isAdmin, deleteCategory);

export default router;
