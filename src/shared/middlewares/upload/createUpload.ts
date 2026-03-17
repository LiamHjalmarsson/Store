import multer from "multer";
import type { Request } from "express";

type CreateUploadMiddlewareOptions = {
	fieldName: string;
	maxFileSizeInMb?: number;
	allowedMimeTypes?: string[];
};

export function createUploadMiddleware({
	fieldName,
	maxFileSizeInMb = 5,
	allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"],
}: CreateUploadMiddlewareOptions) {
	const storage = multer.memoryStorage();

	function fileFilter(_: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
		if (!allowedMimeTypes.includes(file.mimetype)) {
			return cb(new Error(`Invalid file type. Allowed types: ${allowedMimeTypes.join(", ")}`));
		}

		cb(null, true);
	}

	return multer({
		storage,
		limits: {
			fileSize: maxFileSizeInMb * 1024 * 1024,
		},
		fileFilter,
	}).single(fieldName);
}
