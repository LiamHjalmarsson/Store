import { Router } from "express";
import { getAllSubcategories, getSubcategory } from "../controllers/subcategoryController.js";

const router = Router();

router.get("/", getAllSubcategories);

router.get("/:id", getSubcategory);

export default router;
