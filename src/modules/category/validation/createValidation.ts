import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFields.js";
import { categoryTitleNotUsed } from "./rules/categoryTitleNotUsed.js";

const allowed = ["title", "description", "image", "is_featured"] as const;

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(allowed)),

	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title of category is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Title must be between 3 and 100 characters")
		.custom(categoryTitleNotUsed),

	body("description")
		.optional()
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description can be up to 1000 characters"),

	body("image").optional().isURL().withMessage("Must be a valid image URL"),

	body("is_featured").optional().isBoolean().withMessage("is_featured must be true or false"),
]);
