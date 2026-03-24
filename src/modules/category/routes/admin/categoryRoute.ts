import { Router } from "express";
import {
	createCategoryController,
	deleteCategoryController,
	getAllCategoriesController,
	getCategoryController,
	updateCategoryController,
} from "../../controller/categoryController.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createValidation } from "../../validation/createValidation.js";
import { updateValidation } from "../../validation/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllCategoriesController);

router.post("/", createValidation, createCategoryController);

router.get("/:id", getCategoryController);

router.patch("/:id", updateValidation, updateCategoryController);

router.delete("/:id", deleteCategoryController);

export default router;
