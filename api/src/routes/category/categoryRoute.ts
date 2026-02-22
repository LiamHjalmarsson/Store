import { Router } from "express";
import { getAllCategories, getCategory } from "../../controllers/category/categoryController.js";

const router = Router();

router.get("/", getAllCategories);

router.get("/:id", getCategory);

export default router;
