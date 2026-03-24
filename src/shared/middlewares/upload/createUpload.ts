import multer from "multer";
import type { Request } from "express";
import { BadRequestError } from "../../errors/badRequest.js";

type CreateUploadMiddlewareOptions = {
	fieldName: string;
	maxFileSizeInMb?: number;
	allowedMimeTypes?: string[];
};

type UploadFileFilter = (request: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => void;

function buildInvalidMimeTypeError(
	file: Express.Multer.File,
	expectedFieldName: string,
	allowedMimeTypes: readonly string[],
) {
	return new BadRequestError([
		`Invalid file type for upload field "${file.fieldname}"`,
		`Expected field name: ${expectedFieldName}`,
		`Received file: ${file.originalname}`,
		`Received MIME type: ${file.mimetype}`,
		`Allowed MIME types: ${allowedMimeTypes.join(", ")}`,
	]);
}

function buildFileFilter(
	expectedFieldName: string,
	allowedMimeTypes: readonly string[],
	normalizedAllowedMimeTypes: readonly string[],
): UploadFileFilter {
	return (_request, file, callback) => {
		const normalizedMimeType = file.mimetype.toLowerCase();

		if (!normalizedAllowedMimeTypes.includes(normalizedMimeType)) {
			return callback(buildInvalidMimeTypeError(file, expectedFieldName, allowedMimeTypes));
		}

		callback(null, true);
	};
}

export function createUploadMiddleware({
	fieldName,
	maxFileSizeInMb = 5,
	allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"],
}: CreateUploadMiddlewareOptions) {
	const storage = multer.memoryStorage();
	const normalizedAllowedMimeTypes = allowedMimeTypes.map((mimeType) => mimeType.toLowerCase());
	const fileFilter = buildFileFilter(fieldName, allowedMimeTypes, normalizedAllowedMimeTypes);

	return multer({
		storage,
		limits: {
			fileSize: maxFileSizeInMb * 1024 * 1024,
		},
		fileFilter,
	}).single(fieldName);
}

