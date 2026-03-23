import { deleteFile } from "../../../../services/storage/storageService.js";
import { uploadSingleFile } from "../../../../services/upload/uploadService.js";
import { getStorageLocationFromPublicPath } from "../../../../shared/utils/path/getStorageLocationFromPublicPath.js";

export function buildProductImageDirectory(creatorId: number, productId: number) {
	return `creator-${creatorId}/products/product-${productId}/images`;
}

export function buildProductFileDirectory(creatorId: number, productId: number) {
	return `creator-${creatorId}/products/product-${productId}/files`;
}

export async function deleteStoredFileByPublicPath(publicPath: string | null) {
	if (!publicPath) {
		return;
	}

	const storageLocation = getStorageLocationFromPublicPath(publicPath);

	if (!storageLocation.filename) {
		return;
	}

	await deleteFile("creators", storageLocation.filename, storageLocation.subdirectory ?? undefined);
}

export async function uploadProductAssets(
	creatorId: number,
	productId: number,
	imageFile?: Express.Multer.File,
	productFile?: Express.Multer.File,
) {
	let imageUrl: string | null = null;

	let fileUrl: string | null = null;

	let fileSize: number | null = null;

	if (imageFile) {
		const imageDirectory = buildProductImageDirectory(creatorId, productId);

		const uploadedImage = await uploadSingleFile(imageFile, "creators", imageDirectory);

		imageUrl = uploadedImage.publicPath;
	}

	if (productFile) {
		const fileDirectory = buildProductFileDirectory(creatorId, productId);

		const uploadedFile = await uploadSingleFile(productFile, "creators", fileDirectory);

		fileUrl = uploadedFile.publicPath;

		fileSize = productFile.size;
	}

	return {
		imageUrl,
		fileUrl,
		fileSize,
	};
}
