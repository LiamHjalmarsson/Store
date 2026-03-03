import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const createValidation = validateRequest([
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Title is required")
		.isLength({ min: 2, max: 100 })
		.withMessage("Title must be 2-100 characters"),

	body("category_id")
		.notEmpty()
		.withMessage("category_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid category_id")
		.toInt(),

	body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description max 1000 characters"),
]);
