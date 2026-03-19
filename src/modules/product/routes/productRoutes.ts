import { Router } from "express";
import {
	createProductController,
	deleteProductController,
	getAllProductsController,
	getProductController,
	updateProductController,
	updateProductImageController,
} from "../controller/productController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { isCreator } from "../../../shared/middlewares/isCreator.js";
import { createProductValidation } from "../validation/createProductValidation.js";
import { isCreatorOrAdmin } from "../../../shared/middlewares/isCreatorOrAdmin.js";
import { updateProductValidation } from "../validation/updateProductValidation.js";
import { uploadProductImageMiddleware } from "../middleware/uploadProductImageMiddleware.js";

const router = Router();

router.get("/", getAllProductsController);

router.post(
	"/",
	authenticated,
	isCreatorOrAdmin,
	uploadProductImageMiddleware,
	createProductValidation,
	createProductController,
);

router.get("/:id", getProductController);

router.patch("/:id/image", authenticated, isCreatorOrAdmin, uploadProductImageMiddleware, updateProductImageController);

router.patch("/:id", authenticated, isCreatorOrAdmin, updateProductValidation, updateProductController);

router.delete("/:id", authenticated, isCreator, deleteProductController);

export default router;
