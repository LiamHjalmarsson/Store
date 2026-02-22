import { Router } from "express";
import { getAllSubcategories } from "../controller/subcategoryController.js";

const router = Router();

router.get("/", getAllSubcategories);

export default router;
