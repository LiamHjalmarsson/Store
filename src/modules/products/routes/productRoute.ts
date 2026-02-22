import { Router } from "express";
import { getAllSubcategories } from "../controller/productController.js";

const router = Router();

router.get("/", getAllSubcategories);

export default router;
