import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const categoryTitleNotUsed = async (title: string) => {
	const result = await query(`SELECT 1 FROM categories WHERE title = $1`, [title]);

	if (result.rowCount && result.rowCount > 0) {
		throw new BadRequestError("Category title is already used");
	}

	return true;
};
