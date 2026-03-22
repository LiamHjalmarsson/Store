import { Router } from "express";
import { getAllCategoriesController, getCategoryController } from "../controller/categoryController.js";

const router = Router();

router.get("/", getAllCategoriesController);

router.get("/:id", getCategoryController);

export default router;
