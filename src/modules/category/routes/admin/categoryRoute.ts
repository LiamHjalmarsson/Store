import { Router } from "express";
import {
	createCategoryController,
	deleteCategoryController,
	getAllCategoriesController,
	getCategoryController,
	updateCategoryController,
} from "../../controllers/categoryController.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import { createValidation } from "../../validations/createValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllCategoriesController);

router.post("/", createValidation, createCategoryController);

router.get("/:id", getCategoryController);

router.patch("/:id", updateValidation, updateCategoryController);

router.delete("/:id", deleteCategoryController);

export default router;
