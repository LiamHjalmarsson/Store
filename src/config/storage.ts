import path from "path";

export const UPLOAD_ROOT = path.resolve(process.cwd(), "uploads");

export const STORAGE_PATHS = {
	products: path.join(UPLOAD_ROOT, "products"),
	creators: path.join(UPLOAD_ROOT, "creators"),
	avatars: path.join(UPLOAD_ROOT, "avatars"),
};
