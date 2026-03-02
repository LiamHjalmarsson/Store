import { Router } from "express";
import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategory,
	updateCategory,
} from "../../controller/categoryController.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createValidation } from "../../validation/createValidation.js";
import { updateValidation } from "../../validation/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllCategories);

router.post("/", createValidation, createCategory);

router.get("/:id", getCategory);

router.put("/:id", updateValidation, updateCategory);

router.delete("/:id", deleteCategory);

export default router;
