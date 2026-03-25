import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { categoryExistsById } from "./rules/categoryExistsById.js";
import { categoryTitleNotUsed } from "./rules/categoryTitleNotUsed.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";

const allowed = ["title", "description", "image", "is_featured"] as const;

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid category ID").bail().custom(categoryExistsById).bail(),

	body().custom(onlyAllowedFields(allowed)),

	body().custom(requireAtLeastOneField),

	body("title")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Title cannot be empty if provided")
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
