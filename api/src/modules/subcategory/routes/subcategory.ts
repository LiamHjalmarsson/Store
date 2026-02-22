import { Router } from "express";
import { getAllSubcategories } from "../controller/subcategory.js";

const router = Router();

router.get("/", getAllSubcategories);

export default router;
