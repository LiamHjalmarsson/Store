import { deleteFile } from "../../../services/storage/storageService.js";
import { uploadSingleFile } from "../../../services/upload/uploadService.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { getFilenameFromPublicPath } from "../../../shared/utils/file/getFileNameFromPath.js";
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

export const createProductService = async (id: number, payload: CreateProductPayload, file?: Express.Multer.File) => {
	let imageUrl: string | null = null;

	if (file) {
		const upload = await uploadSingleFile(file, "products");

		imageUrl = upload.publicPath;
	}

	return await createProductQuery(id, {
		...payload,
		image_url: imageUrl,
	});
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
	const product = await deleteProductByIdQuery(id, creatorId);

	if (!product) {
		throw new NotFoundError("Product not found");
	}

	return true;
};

export const updateProductImageService = async (id: number, creatorId: number, file: Express.Multer.File) => {
	const existingProduct = await findProductByIdForCreatorQuery(id, creatorId);

	if (!existingProduct) {
		throw new NotFoundError("Product not found");
	}

	const upload = await uploadSingleFile(file, "products");

	const updatedProduct = await updateProductByIdQuery(id, creatorId, {
		image_url: upload.publicPath,
	});

	if (!updatedProduct) {
		throw new NotFoundError("Product not found");
	}

	if (existingProduct.image_url) {
		const oldFilename = getFilenameFromPublicPath(existingProduct.image_url);

		if (oldFilename && oldFilename !== upload.filename) {
			await deleteFile("products", oldFilename);
		}
	}

	return {
		product: updatedProduct,
		file: upload,
	};
};
