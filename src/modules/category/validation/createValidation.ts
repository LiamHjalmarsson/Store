import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { categoryNotUsed } from "../../../shared/validations/modules/category/notUsed.js";

export const createValidation = validateRequest([
	body("title").trim().notEmpty().withMessage("Title of category is required").custom(categoryNotUsed),

	body("description").optional().trim().isLength({ max: 10 }).withMessage("Description can max be 1000 letters"),

	body("image").optional().isURL().withMessage("Must be image url"),

	body("is_featured").optional().isBoolean().withMessage("Must be true or false"),
]);
