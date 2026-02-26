import { Request, Response } from "express";
import {
	createProductService,
	deleteProductService,
	getAllProductsService,
	getProductService,
	updateProductService,
} from "../service/productService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenicated.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getAllProducts = async (_: Request, res: Response) => {
	const products = await getAllProductsService();

	res.json({ products });
};

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
	const creatorId = req.user!.id;

	const product = await createProductService(creatorId, req.body);

	res.status(201).json({ product });
};

export const getProduct = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const product = await getProductService(id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	res.json({ product });
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	const product = await updateProductService(id, creatorId, req.body);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	res.json({ product });
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	const deleted = await deleteProductService(id, creatorId);

	if (!deleted) {
		throw new NotFoundError("Product not found");
	}

	res.json({ message: "Product deleted" });
};
