import { fileExists, getFilePath } from "../../../services/storage/storageService.js";
import { ForbiddenError } from "../../../shared/errors/forbidden.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { getStorageLocationFromPublicPath } from "../../../shared/utils/path/getStorageLocationFromPublicPath.js";
import { userOwnsProductQuery } from "../repository/productRepository.js";
import { getProductService } from "./productService.js";

export const downloadProductService = async (productId: number, userId: number) => {
	const product = await getProductService(productId);

	if (!product.file_url) {
		throw new NotFoundError("Product file not found");
	}

	const isProductCreator = product.creator_id === userId;

	const hasPurchasedProduct = await userOwnsProductQuery(userId, productId);

	if (!isProductCreator && !hasPurchasedProduct) {
		throw new ForbiddenError("You do not have access to download this product");
	}

	const storageLocation = getStorageLocationFromPublicPath(product.file_url);

	const fileIsStored = await fileExists(
		"creators",
		storageLocation.filename,
		storageLocation.subdirectory ?? undefined,
	);

	if (!fileIsStored) {
		throw new NotFoundError("Stored file not found");
	}

	const absoluteFilePath = getFilePath(
		"creators",
		storageLocation.filename,
		storageLocation.subdirectory ?? undefined,
	);

	return {
		product,
		filePath: absoluteFilePath,
		filename: storageLocation.filename,
	};
};
