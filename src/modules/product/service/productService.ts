import { deleteFile } from "../../../services/storage/storageService.js";
import { uploadSingleFile } from "../../../services/upload/uploadService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { getStorageLocationFromPublicPath } from "../../../shared/utils/file/getStorageLocationFromPublicPath.js";
import {
	createProductQuery,
	deleteProductByIdQuery,
	findProductByIdForCreatorQuery,
	findProductByIdQuery,
	findProductsQuery,
	updateProductByIdQuery,
} from "../repository/productRepository.js";
import { CreateProductPayload, UpdateProductPayload } from "../types/product.types.js";

export const getAllProductsService = async (pagination: PaginationQuery) => {
	return await findProductsQuery(pagination);
};

export const createProductService = async (
	creatorId: number,
	payload: CreateProductPayload,
	file?: Express.Multer.File,
) => {
	const createdProduct = await createProductQuery(creatorId, {
		...payload,
		image_url: null,
	});

	if (!createdProduct) {
		throw new NotFoundError("Could not create product");
	}

	if (!file) {
		return createdProduct;
	}

	const subdirectory = `creator-${creatorId}/products/product-${createdProduct.id}/images`;

	const upload = await uploadSingleFile(file, "creators", subdirectory);

	const updatedProduct = await updateProductByIdQuery(createdProduct.id, creatorId, {
		image_url: upload.publicPath,
	});

	if (!updatedProduct) {
		throw new NotFoundError("Could not update product image");
	}

	return updatedProduct;
};

export const getProductService = async (id: number) => {
	const product = await findProductByIdQuery(id);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return product;
};

export const updateProductService = async (id: number, creatorId: number, payload: UpdateProductPayload) => {
	const product = await updateProductByIdQuery(id, creatorId, payload);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return product;
};

export const deleteProductService = async (id: number, creatorId: number) => {
	const existingProduct = await findProductByIdForCreatorQuery(id, creatorId);

	if (!existingProduct) {
		throw new NotFoundError("Product not found");
	}

	if (existingProduct.image_url) {
		const oldLocation = getStorageLocationFromPublicPath(existingProduct.image_url);

		if (oldLocation.filename) {
			await deleteFile("creators", oldLocation.filename, oldLocation.subdirectory ?? undefined);
		}
	}

	const deleted = await deleteProductByIdQuery(id, creatorId);

	if (!deleted) {
		throw new NotFoundError("Product not found");
	}

	return true;
};

export const updateProductImageService = async (id: number, creatorId: number, file: Express.Multer.File) => {
	const existingProduct = await findProductByIdForCreatorQuery(id, creatorId);

	if (!existingProduct) {
		throw new NotFoundError("Product not found");
	}

	const subdirectory = `creator-${creatorId}/products/product-${id}/images`;

	const upload = await uploadSingleFile(file, "creators", subdirectory);

	const updatedProduct = await updateProductByIdQuery(id, creatorId, {
		image_url: upload.publicPath,
	});

	if (!updatedProduct) {
		throw new NotFoundError("Product not found");
	}

	if (existingProduct.image_url) {
		const oldLocation = getStorageLocationFromPublicPath(existingProduct.image_url);

		if (oldLocation.filename && oldLocation.filename !== upload.filename) {
			await deleteFile("creators", oldLocation.filename, oldLocation.subdirectory ?? undefined);
		}
	}

	return {
		product: updatedProduct,
		file: upload,
	};
};
