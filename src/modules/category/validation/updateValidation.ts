import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { categoryNotUsed } from "../../../shared/validations/modules/category/notUsed.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid category ID").bail().custom(categoryNotUsed).bail(),

	body("title")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Title cannot be empty if provided")
		.isLength({ min: 3, max: 100 })
		.withMessage("Title must be between 3 and 100 characters"),

	body("description")
		.optional()
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description can be up to 1000 characters"),

	body("image").optional().isURL().withMessage("Must be a valid image URL"),

	body("is_featured").optional().isBoolean().withMessage("is_featured must be true or false"),
]);
