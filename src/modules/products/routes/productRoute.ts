import { Router } from "express";
import { getAllProducts } from "../controller/productController.js";

const router = Router();

router.get("/", getAllProducts);

export default router;
