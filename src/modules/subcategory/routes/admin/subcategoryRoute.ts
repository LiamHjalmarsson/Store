import { Router } from "express";
import { isAdmin } from "../../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../../shared/middlewares/authenticated.js";
import {
	createSubcategory,
	deleteSubcategory,
	getAllSubcategories,
	getSubcategory,
	updateSubcategory,
} from "../../controllers/subcategoryController.js";
import { updateValidation } from "../../validations/updateValidation.js";
import { createValidation } from "../../validations/createValidation.js";

const router = Router();

router.use(authenticated, isAdmin);

router.get("/", getAllSubcategories);

router.post("/", createValidation, createSubcategory);

router.get("/:id", getSubcategory);

router.patch("/:id", updateValidation, updateSubcategory);

router.delete("/:id", deleteSubcategory);

export default router;
