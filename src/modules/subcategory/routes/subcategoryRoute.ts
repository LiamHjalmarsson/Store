import { Router } from "express";
import {
	createSubcategory,
	getAllSubcategories,
	getSubcategory,
	updateSubcategory,
} from "../controller/subcategoryController.js";
import { createValidation } from "../validation/createValidation.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { updateValidation } from "../validation/updateValidation.js";

const router = Router();

router.get("/", getAllSubcategories);

router.post("/", authenticated, isAdmin, createValidation, createSubcategory);

router.get("/:id", getSubcategory);

router.patch("/:id", authenticated, isAdmin, updateValidation, updateSubcategory);

export default router;
