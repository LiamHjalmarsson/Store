import path from "path";
import { createSafeFilename } from "../../shared/utils/file/createSafeFilename.js";
import { saveFile, getPublicFilePath, type StorageDisk } from "../storage/storageService.js";

type UploadableFile = {
	originalname: string;
	buffer: Buffer;
	mimetype: string;
	size: number;
};

export type UploadSingleFileResult = {
	disk: StorageDisk;
	filename: string;
	filePath: string;
	publicPath: string;
	mimetype: string;
	size: number;
	subdirectory: string | null;
};

function getExtensionFromMimeType(mimetype: string): string {
	switch (mimetype) {
		case "image/jpeg":
			return ".jpg";
		case "image/png":
			return ".png";
		case "image/webp":
			return ".webp";
		case "application/pdf":
			return ".pdf";
		case "application/zip":
		case "application/x-zip-compressed":
			return ".zip";
		default:
			return "";
	}
}

export async function uploadSingleFile(
	file: UploadableFile,
	disk: StorageDisk,
	subdirectory?: string,
): Promise<UploadSingleFileResult> {
	let filename = createSafeFilename(file.originalname);

	if (!path.extname(filename)) {
		filename += getExtensionFromMimeType(file.mimetype);
	}

	const filePath = await saveFile(disk, filename, file.buffer, subdirectory);

	const publicPath = getPublicFilePath(disk, filename, subdirectory);

	return {
		disk,
		filename,
		filePath,
		publicPath,
		mimetype: file.mimetype,
		size: file.size,
		subdirectory: subdirectory ?? null,
	};
}
