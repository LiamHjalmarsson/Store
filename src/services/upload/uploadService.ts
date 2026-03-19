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
};

export async function uploadSingleFile(file: UploadableFile, disk: StorageDisk): Promise<UploadSingleFileResult> {
	const filename = createSafeFilename(file.originalname);

	const filePath = await saveFile(disk, filename, file.buffer);

	const publicPath = getPublicFilePath(disk, filename);

	return {
		disk,
		filename,
		filePath,
		publicPath,
		mimetype: file.mimetype,
		size: file.size,
	};
}
