import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import {
	createProductService,
	deleteProductService,
	getAllProductsService,
	getProductService,
	updateProductService,
} from "../services/productService.js";
import { pagination } from "../../../shared/utils/http/pagination.js";
import { sendError, sendSuccess } from "../../../shared/utils/http/respond.js";
import { updateProductImageService } from "../services/updateImageService.js";
import { downloadProductService } from "../services/downloadService.js";
import { CreateProductPayload, ProductUploadFiles, UpdateProductPayload } from "../types/product.js";

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
	const creatorId = getAuthenticatedUserId(req);

	const payload = req.body as CreateProductPayload;

	const { imageFile, productFile } = getProductUploadFiles(req);

	const product = await createProductService(creatorId, payload, imageFile, productFile);

	return sendSuccess(res, "Product created successfully", { product }, 201);
};

export const getProductController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const product = await getProductService(id);

	return sendSuccess(res, "Product retrieved successfully", { product });
};

export const updateProductController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = getAuthenticatedUserId(req);

	const payload = req.body as UpdateProductPayload;

	const product = await updateProductService(id, creatorId, payload);

	return sendSuccess(res, "Product updated successfully", { product });
};

export const deleteProductController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = getAuthenticatedUserId(req);

	await deleteProductService(id, creatorId);

	return sendSuccess(res, "Product deleted successfully", null);
};

export const updateProductImageController = async (req: AuthenticatedRequest, res: Response) => {
	const id = Number(req.params.id);

	const creatorId = getAuthenticatedUserId(req);

	if (!req.file) {
		return sendError(res, "No file uploaded");
	}

	const result = await updateProductImageService(id, creatorId, req.file);

	return sendSuccess(res, "Product image updated successfully", result);
};

export const downloadProductController = async (req: AuthenticatedRequest, res: Response) => {
	const productId = Number(req.params.id);

	const userId = getAuthenticatedUserId(req);

	if (Number.isNaN(productId) || productId < 1) {
		return sendError(res, "Invalid product ID");
	}

	const result = await downloadProductService(productId, userId);

	return res.download(result.filePath, result.filename);
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError("Authentication required");
	}

	return userId;
}

function getProductUploadFiles(req: AuthenticatedRequest) {
	const files = req.files as ProductUploadFiles | undefined;

	return {
		imageFile: files?.image?.[0],
		productFile: files?.file?.[0],
	};
}

