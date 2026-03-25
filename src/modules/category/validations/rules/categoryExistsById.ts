import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const categoryExistsById = async (id: string) => {
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
