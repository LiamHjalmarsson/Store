import { deleteFile } from "../../../services/storage/storageService.js";
import { uploadSingleFile } from "../../../services/upload/uploadService.js";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { getStorageLocationFromPublicPath } from "../../../shared/utils/path/getStorageLocationFromPublicPath.js";
import { updateProductByIdQuery } from "../repositories/productRepository.js";
import { buildProductImageDirectory } from "./library/productStorage.js";
import { getCreatorProduct } from "./productService.js";

export const updateProductImageService = async (id: number, creatorId: number, imageFile: Express.Multer.File) => {
	const existingProduct = await getCreatorProduct(id, creatorId);

	const imageDirectory = buildProductImageDirectory(creatorId, id);

	const uploadedImage = await uploadSingleFile(imageFile, "creators", imageDirectory);

	let updatedProduct;

	try {
		updatedProduct = await updateProductByIdQuery(id, creatorId, {
			image_url: uploadedImage.publicPath,
		});
	} catch (error) {
		await deleteFile("creators", uploadedImage.filename, uploadedImage.subdirectory ?? undefined);

		throw error;
	}

	if (!updatedProduct) {
		await deleteFile("creators", uploadedImage.filename, uploadedImage.subdirectory ?? undefined);

		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Product"));
	}

	const previousImagePath = existingProduct.image_url;

	if (previousImagePath) {
		const previousImageLocation = getStorageLocationFromPublicPath(previousImagePath);

		const isDifferentFile =
			previousImageLocation.filename && previousImageLocation.filename !== uploadedImage.filename;

		if (isDifferentFile) {
			await deleteFile(
				"creators",
				previousImageLocation.filename,
				previousImageLocation.subdirectory ?? undefined,
			);
		}
	}

	return {
		product: updatedProduct,
		file: uploadedImage,
	};
};
