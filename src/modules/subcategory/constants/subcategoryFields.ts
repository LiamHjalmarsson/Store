import { CreateSubcategoryPayload } from "../types/subcategory.js";

export const SUBCATEGORY_FIELDS = [
	"title",
	"category_id",
	"description",
] as const satisfies (keyof CreateSubcategoryPayload)[];
