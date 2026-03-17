import path from "path";

export const UPLOAD_ROOT = path.resolve(process.cwd(), "uploads");

export const STORAGE_PATHS = {
	products: path.join(UPLOAD_ROOT, "products"),
	categories: path.join(UPLOAD_ROOT, "categories"),
	avatars: path.join(UPLOAD_ROOT, "avatars"),
};
