import { body, param } from "express-validator";
import { query } from "../../config/database.js";
import { BadRequestError } from "../../shared/errors/badRequest.js";
import { NotFoundError } from "../../shared/errors/notFound.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";

const categoryExists = async (id: string) => {
	const categoryId = Number(id);

	if (isNaN(categoryId) || categoryId < 1) {
		throw new BadRequestError("Invalid category ID");
	}

	const result = await query(`SELECT 1 FROM categories WHERE id = $1`, [categoryId]);

	if (result.rowCount === 0) {
		throw new NotFoundError(`No category found with this id`);
	}

	return true;
};

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid category ID").bail().custom(categoryExists).bail(),

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
