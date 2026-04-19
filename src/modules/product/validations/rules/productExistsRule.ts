import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";
import { PRODUCT_MESSAGES } from "../../constants/productMessages.js";

export const productExistsRule = async (id: string | number) => {
	const productId = Number(id);

	if (Number.isNaN(productId) || productId < 1) {
		throw new BadRequestError(PRODUCT_MESSAGES.INVALID_ID);
	}

	const result = await query(
		`
		SELECT id 
		FROM products 
		WHERE id = $1`,
		[productId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return true;
};
