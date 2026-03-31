import { Router } from "express";
import { getAllSubcategoriesController, getSubcategoryController } from "../controllers/subcategoryController.js";

const router = Router();

router.get("/", getAllSubcategoriesController);

router.get("/:id", getSubcategoryController);

export default router;
