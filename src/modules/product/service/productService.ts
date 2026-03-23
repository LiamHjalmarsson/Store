import { NotFoundError } from "../../../shared/errors/notFound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import {
	createProductQuery,
	deleteProductByIdQuery,
	findProductByIdForCreatorQuery,
	findProductByIdQuery,
	findProductsQuery,
	updateProductByIdQuery,
} from "../repository/productRepository.js";
import { CreateProductPayload, UpdateProductPayload } from "../types/product.types.js";
import { deleteStoredFileByPublicPath, uploadProductAssets } from "./helpers/productStorage.js";

export async function getCreatorProduct(productId: number, creatorId: number) {
	const product = await findProductByIdForCreatorQuery(productId, creatorId);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return product;
}

export const getAllProductsService = async (pagination: PaginationQuery) => {
	return await findProductsQuery(pagination);
};

export const createProductService = async (
	creatorId: number,
	payload: CreateProductPayload,
	imageFile?: Express.Multer.File,
	productFile?: Express.Multer.File,
) => {
	const createdProduct = await createProductQuery(creatorId, {
		...payload,
		image_url: null,
		file_url: null,
		file_size: null,
	});

	if (!createdProduct) {
		throw new NotFoundError("Could not create product");
	}

	const hasNoFiles = !imageFile && !productFile;

	if (hasNoFiles) {
		return createdProduct;
	}

	const uploadedAssets = await uploadProductAssets(creatorId, createdProduct.id, imageFile, productFile);

	const updatedProduct = await updateProductByIdQuery(createdProduct.id, creatorId, {
		image_url: uploadedAssets.imageUrl,
		file_url: uploadedAssets.fileUrl,
		file_size: uploadedAssets.fileSize,
	});

	if (!updatedProduct) {
		throw new NotFoundError("Could not update product assets");
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
	const existingProduct = await getCreatorProduct(id, creatorId);

	await deleteStoredFileByPublicPath(existingProduct.image_url);

	await deleteStoredFileByPublicPath(existingProduct.file_url);

	const wasDeleted = await deleteProductByIdQuery(id, creatorId);

	if (!wasDeleted) {
		throw new NotFoundError("Product not found");
	}

	return true;
};
