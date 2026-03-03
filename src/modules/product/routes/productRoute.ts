import { Router } from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProduct,
	updateProduct,
} from "../controller/productController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isCreator } from "../../../shared/middlewares/isCreator.js";

const router = Router();

router.get("/", getAllProducts);

router.post("/", authenticated, isCreator, createProduct);

router.get("/:id", getProduct);

router.patch("/:id", authenticated, isCreator, updateProduct);

router.delete("/:id", authenticated, isCreator, deleteProduct);

export default router;
