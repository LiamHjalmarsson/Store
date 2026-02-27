import { body } from "express-validator";
import { query } from "../../config/database.js";
import { BadRequestError } from "../../shared/errors/badRequest.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";

const categoryExists = async (category: string) => {
	const result = await query(`SELECT 1 FROM categories WHERE title = $1`, [category]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Category already exists");
	}

	return true;
};

export const createValidation = validateRequest([
	body("title").trim().notEmpty().withMessage("Title of category is required").custom(categoryExists),
	body("description").optional().trim().isLength({ max: 10 }).withMessage("Description can max be 1000 letters"),
	body("image").optional().isURL().withMessage("Must be image url"),
	body("is_featured").optional().isBoolean().withMessage("Must be true or false"),
]);
