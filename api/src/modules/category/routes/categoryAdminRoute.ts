import { Router } from "express";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import authenicated from "../../../middlewares/authenicated.js";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../controller/categoryController.js";

const router = Router();

router.use(authenicated, isAdmin);

router.get("/", getAllCategories);

router.post("/", createCategory);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
