import { Request, Response } from "express";
import {
	createProductService,
	deleteProductService,
	getAllProductsService,
	getProductService,
	updateProductService,
} from "../service/productService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { pagination } from "../../../shared/utils/pagination.js";
import { sendSuccess } from "../../../shared/utils/respond.js";

export const getAllProducts = async (req: Request, res: Response) => {
	const { page, limit, offset } = pagination(req.query);

	const result = await getAllProductsService({ page, limit, offset });

	return sendSuccess(res, "Products retrieved successfully", {
		products: result.items,
		meta: {
			page: result.page,
			limit: result.limit,
			total: result.total,
			totalPages: result.totalPages,
		},
	});
};

export const createProduct = async (req: AuthenticatedRequest, res: Response) => {
	const creatorId = req.user!.id;

	const product = await createProductService(creatorId, req.body);

	return sendSuccess(res, "Product created successfully", { product }, 201);
};

export const getProduct = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const product = await getProductService(id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return sendSuccess(res, "Product retrieved successfully", { product });
};

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	const product = await updateProductService(id, creatorId, req.body);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return sendSuccess(res, "Product updated successfully", { product });
};

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	const deleted = await deleteProductService(id, creatorId);

	if (!deleted) {
		throw new NotFoundError("Product not found");
	}

	return sendSuccess(res, "Product deleted successfully", null);
};
