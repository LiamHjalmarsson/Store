import { body } from "express-validator";
import { categoryTitleNotUsed } from "../rules/categoryTitleNotUsed.js";

export function titleField() {
	return body("title")
		.trim()
		.notEmpty()
		.withMessage("Title of category is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Title must be between 3 and 100 characters")
		.custom(categoryTitleNotUsed);
}

export function descriptionField() {
	return body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description can be up to 1000 characters");
}

export function imageField() {
	return body("image").optional({ nullable: true }).isURL().withMessage("Must be a valid image URL");
}

export function isFeaturedField() {
	return body("is_featured").optional().isBoolean().withMessage("is_featured must be true or false");
}
