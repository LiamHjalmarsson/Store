import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from "../controller/productController.js";
import authenicated from "../../../shared/middlewares/authenicated.js";
import { isCreator } from "../../../shared/middlewares/isCreator.js";

const router = Router();

router.get("/", getAllProducts);

router.post("/", authenicated, isCreator, createProduct);

router.get("/:id", getProduct);

router.patch("/:id", authenicated, isCreator, updateProduct);

router.delete("/:id", authenicated, isCreator, deleteProduct);

export default router;
