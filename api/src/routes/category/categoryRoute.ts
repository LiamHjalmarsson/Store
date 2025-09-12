import { Router } from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../../controllers/category/categoryController.js";

const router = Router();

router.get("/", getAllCategories);

router.post("/", createCategory);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
