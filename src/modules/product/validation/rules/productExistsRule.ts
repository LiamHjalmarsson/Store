import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const productExistsRule = async (id: string | number) => {
	const productId = Number(id);

	if (Number.isNaN(productId) || productId < 1) {
		throw new BadRequestError("Invalid product ID");
	}

	const result = await query(
		`
		SELECT id 
		FROM products 
		WHERE id = $1`,
		[productId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError("Product not found");
	}

	return true;
};
