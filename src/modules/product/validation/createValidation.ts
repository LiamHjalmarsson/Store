import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const createValidation = validateRequest([
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 3, max: 120 })
		.withMessage("Title must be between 3 and 120 characters"),

	body("price")
		.notEmpty()
		.withMessage("Price is required")
		.isFloat({ min: 0 })
		.withMessage("Price must be 0 or higher")
		.toFloat(),

	body("category_id")
		.notEmpty()
		.withMessage("category_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid category_id")
		.toInt(),

	body("subcategory_id")
		.notEmpty()
		.withMessage("subcategory_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid subcategory_id")
		.toInt(),

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
