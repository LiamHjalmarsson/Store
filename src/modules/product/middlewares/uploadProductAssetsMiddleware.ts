import multer from "multer";
import { BadRequestError } from "../../../shared/errors/badRequest.js";

const memoryStorage = multer.memoryStorage();

const allowedImageMimeTypes = ["image/jpeg", "image/png", "image/webp"];

const allowedProductFileMimeTypes = ["application/zip", "application/x-zip-compressed", "application/pdf"];

function validateImageFile(file: Express.Multer.File) {
	return allowedImageMimeTypes.includes(file.mimetype);
}

function validateProductFile(file: Express.Multer.File) {
	return allowedProductFileMimeTypes.includes(file.mimetype);
}

const upload = multer({
	storage: memoryStorage,
	limits: {
		fileSize: 50 * 1024 * 1024,
	},
	fileFilter: (_request, file, callback) => {
		if (file.fieldname === "image") {
			if (!validateImageFile(file)) {
				return callback(new BadRequestError("Invalid image file type"));
			}

			return callback(null, true);
		}

		if (file.fieldname === "file") {
			if (!validateProductFile(file)) {
				return callback(new BadRequestError("Invalid product file type"));
			}

			return callback(null, true);
		}

		return callback(new BadRequestError(`Unexpected field: ${file.fieldname}`));
	},
});

export const uploadProductAssetsMiddleware = upload.fields([
	{
		name: "image",
		maxCount: 1,
	},
	{
		name: "file",
		maxCount: 1,
	},
]);
