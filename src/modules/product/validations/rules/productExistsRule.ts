import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const productExistsRule = async (id: string | number) => {
	const productId = Number(id);

	if (Number.isNaN(productId) || productId < 1) {
		throw new BadRequestError(VALIDATION_MESSAGES.INVALID_ID("Product"));
	}

	const result = await query(
		`
		SELECT id 
		FROM products 
		WHERE id = $1`,
		[productId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Product"));
	}

	return true;
};
