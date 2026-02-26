import { Request, Response } from "express";
import {
	createProductService,
	deleteProductService,
	getAllProductsService,
	getProductService,
	updateProductService,
} from "../service/productService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenicated.js";

export const getAllProducts = async (req: Request, res: Response) => {
	const products = await getAllProductsService();

	res.json({ products });
};

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
	const creatorId = req.user?.id;

	if (!creatorId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const product = await createProductService(creatorId, req.body);

	res.status(201).json({ product });
};

export const getProduct = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const product = await getProductService(id);

	if (!product) {
		return res.status(404).json({ message: "Product not found" });
	}

	res.json({ product });
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user?.id;

	if (!creatorId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const updated = await updateProductService(id, creatorId, req.body);

	res.json({ product: updated });
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user?.id;

	if (!creatorId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	await deleteProductService(id, creatorId);

	res.json({ message: "Product deleted" });
};
