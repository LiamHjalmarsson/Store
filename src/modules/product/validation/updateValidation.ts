import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validation/utils/requireAtLeastOneFiled.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFileds.js";

const allowedFields = [
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

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid product ID").bail(),

	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("title")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Title cannot be empty")
		.isLength({ min: 3, max: 120 })
		.withMessage("Title must be 3-120"),

	body("price").optional().isFloat({ min: 0 }).withMessage("Price must be 0 or higher").toFloat(),

	body("category_id").optional().isInt({ min: 1 }).withMessage("Invalid category_id").toInt(),

	body("subcategory_id").optional().isInt({ min: 1 }).withMessage("Invalid subcategory_id").toInt(),

	body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 2000 })
		.withMessage("Description max 2000 characters"),

	body("image_url").optional({ nullable: true }).isURL().withMessage("image_url must be a valid URL"),

	body("file_url").optional({ nullable: true }).isURL().withMessage("file_url must be a valid URL"),

	body("file_size")
		.optional({ nullable: true })
		.isInt({ min: 0 })
		.withMessage("file_size must be 0 or higher")
		.toInt(),

	body("is_featured").optional().isBoolean().withMessage("is_featured must be true/false"),

	body("is_discounted").optional().isBoolean().withMessage("is_discounted must be true/false"),

	body("discounted").optional().isFloat({ min: 0 }).withMessage("discounted must be 0 or higher").toFloat(),
]);
