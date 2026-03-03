import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validation/utils/requireAtLeastOneFiled.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFileds.js";
import { subcategoryExistsById } from "./rules/subcategoryExistsById.js";
import { subcategoryTitleUniquePerCategory } from "./rules/subcategoryTitleUniquePerCategory.js";

const allowedFields = ["title", "description", "category_id"] as const;

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid subcategory ID").bail().custom(subcategoryExistsById).bail(),

	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("title")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Title cannot be empty")
		.custom(subcategoryTitleUniquePerCategory),

	body("category_id").optional().isInt({ min: 1 }).withMessage("Invalid category_id").toInt(),

	body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description max 1000 characters"),
]);
