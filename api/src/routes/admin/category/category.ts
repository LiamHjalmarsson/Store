import { Router } from "express";
import { getAllCategories, getCategory } from "../../../controllers/category/categoryController.js";
import { createCategory, updateCategory, deleteCategory } from "../../../controllers/admin/category/category.js";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import authenicated from "../../../middlewares/authenicated.js";

const router = Router();

router.get("/", authenicated, isAdmin, getAllCategories);

router.post("/", authenicated, isAdmin, createCategory);

router.get("/:id", authenicated, isAdmin, getCategory);

router.put("/:id", authenicated, isAdmin, updateCategory);

router.delete("/:id", authenicated, isAdmin, deleteCategory);

export default router;
