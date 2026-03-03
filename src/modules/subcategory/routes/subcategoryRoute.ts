import { Router } from "express";
import { createSubcategory, getAllSubcategories, getSubcategory } from "../controller/subcategoryController.js";
import { createValidation } from "../validation/createValidation.js";
import { isAdmin } from "../../../shared/middlewares/isAdmin.js";

const router = Router();

router.get("/", getAllSubcategories);

router.post("/", isAdmin, createValidation, createSubcategory);

router.get("/:id", getSubcategory);

export default router;
