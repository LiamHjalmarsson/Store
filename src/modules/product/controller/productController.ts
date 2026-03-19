import { Request, Response } from "express";
import {
	createProductService,
	deleteProductService,
	getAllProductsService,
	getProductService,
	updateProductImageService,
	updateProductService,
} from "../service/productService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { pagination } from "../../../shared/utils/pagination.js";
import { sendError, sendSuccess } from "../../../shared/utils/respond.js";

export const getAllProductsController = async (req: Request, res: Response) => {
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

export const createProductController = async (req: AuthenticatedRequest, res: Response) => {
	const creatorId = req.user!.id;

	const product = await createProductService(creatorId, req.body, req.file);

	return sendSuccess(res, "Product created successfully", { product }, 201);
};

export const getProductController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const product = await getProductService(id);

	return sendSuccess(res, "Product retrieved successfully", { product });
};

export const updateProductController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	const product = await updateProductService(id, creatorId, req.body);

	return sendSuccess(res, "Product updated successfully", { product });
};

export const deleteProductController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	await deleteProductService(id, creatorId);

	return sendSuccess(res, "Product deleted successfully", null);
};

export const updateProductImageController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = req.user!.id;

	if (!req.file) {
		return sendError(res, "No file uploaded");
	}

	const result = await updateProductImageService(id, creatorId, req.file);

	return sendSuccess(res, "Product image updated successfully", result);
};
