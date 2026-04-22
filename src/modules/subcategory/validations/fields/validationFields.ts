import { body } from "express-validator";
import { subcategoryTitleUniquePerCategory } from "../rules/subcategoryTitleUniquePerCategory.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";

export function titleField() {
	return body("title")
		.trim()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Title"))
		.isLength({ min: 2, max: 100 })
		.withMessage("Title must be 2-100 characters")
		.custom(subcategoryTitleUniquePerCategory);
}

export function categoryIdField() {
	return body("category_id")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Category ID"))
		.isInt({ min: 1 })
		.withMessage("Invalid category_id")
		.toInt();
}

export function descriptionField() {
	return body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description max 1000 characters");
}
