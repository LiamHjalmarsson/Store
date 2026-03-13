import { Request } from "express";
import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const subcategoryTitleUniquePerCategory = async (title: string, req: Request) => {
	const categoryId = Number(req.body.category_id ?? req.query.category_id);

	if (Number.isNaN(categoryId) || categoryId < 1) {
		throw new BadRequestError("Valid category_id is required");
	}

	const result = await query(`SELECT 1 FROM subcategories WHERE category_id = $1 AND LOWER(title) = LOWER($2)`, [
		categoryId,
		title,
	]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Subcategory title already exists for this category");
	}

	return true;
};
