import { Router } from "express";
import {
	createProductController,
	deleteProductController,
	downloadProductController,
	getAllProductsController,
	getProductController,
	updateProductController,
	updateProductImageController,
} from "../controllers/productController.js";
import authenticated from "../../../shared/middlewares/authenticated.js";
import { createProductValidation } from "../validations/createProductValidation.js";
import { isCreatorOrAdmin } from "../../../shared/middlewares/isCreatorOrAdmin.js";
import { updateProductValidation } from "../validations/updateProductValidation.js";
import { uploadProductAssetsMiddleware } from "../middlewares/uploadProductAssetsMiddleware.js";
import { uploadProductImageMiddleware } from "../middlewares/uploadProductImageMiddleware.js";

const router = Router();

router.get("/", getAllProductsController);

router.post(
	"/",
	authenticated,
	isCreatorOrAdmin,
	uploadProductAssetsMiddleware,
	createProductValidation,
	createProductController,
);

router.get("/:id/download", authenticated, downloadProductController);

router.patch("/:id/image", authenticated, isCreatorOrAdmin, uploadProductImageMiddleware, updateProductImageController);

router.get("/:id", getProductController);

router.patch("/:id", authenticated, isCreatorOrAdmin, updateProductValidation, updateProductController);

router.delete("/:id", authenticated, isCreatorOrAdmin, deleteProductController);

export default router;
