import path from "path";
import crypto from "crypto";

export function createSafeFilename(originalname: string) {
	const extension = path.extname(originalname).toLowerCase();

	const baseName = path
		.basename(originalname, extension)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

	const random = crypto.randomBytes(8).toString("hex");

	const safeBase = baseName || "file";

	return `${safeBase}-${Date.now()}-${random}${extension}`;
}
