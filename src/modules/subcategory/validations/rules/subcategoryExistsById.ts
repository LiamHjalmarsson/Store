import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const subcategoryExistsById = async (id: string) => {
	const subcategoryId = Number(id);

	if (Number.isNaN(subcategoryId) || subcategoryId < 1) {
		throw new BadRequestError("Invalid subcategory ID");
	}

	const result = await query(`SELECT 1 FROM subcategories WHERE id = $1`, [subcategoryId]);

	if (result.rowCount === 0) {
		throw new NotFoundError("Subcategory not found");
	}

	return true;
};
