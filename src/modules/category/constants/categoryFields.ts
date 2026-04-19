import { Category } from "../types/category.js";

export const CATEGORY_FIELDS = [
	"title",
	"description",
	"image",
	"is_featured",
] as const satisfies readonly (keyof Category)[];
