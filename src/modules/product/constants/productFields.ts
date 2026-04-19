import { UpdateProductPayload } from "../types/product.js";

export const UPDATABLE_PRODUCT_FIELDS = [
	"title",
	"description",
	"price",
	"category_id",
	"subcategory_id",
	"image_url",
	"file_url",
	"file_size",
	"is_featured",
	"is_discounted",
	"discounted",
	"status",
] as const satisfies (keyof UpdateProductPayload)[];

export const PRODUCT_FIELDS = [
	"title",
	"description",
	"price",
	"category_id",
	"subcategory_id",
	"image_url",
	"file_url",
	"file_size",
	"is_featured",
	"is_discounted",
	"discounted",
] as const;
