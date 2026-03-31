import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import {
	createSubcategoryController,
	deleteSubcategoryController,
	updateSubcategoryController,
} from "../../controllers/subcategoryController.js";
import { createValidation } from "../../validations/createValidation.js";
import { updateValidation } from "../../validations/updateValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.post("/", createValidation, createSubcategoryController);

router.patch("/:id", updateValidation, updateSubcategoryController);

router.delete("/:id", deleteSubcategoryController);

export default router;
