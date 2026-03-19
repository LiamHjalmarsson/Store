import { createUploadMiddleware } from "../../../shared/middlewares/upload/createUpload.js";

export const uploadProductImageMiddleware = createUploadMiddleware({
	fieldName: "image",
	maxFileSizeInMb: 5,
	allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
});
