import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const achievementExistsById = async (id: string | number) => {
	const achievementId = Number(id);

	if (Number.isNaN(achievementId) || achievementId < 1) {
		throw new BadRequestError(VALIDATION_MESSAGES.INVALID_ID("achievement"));
	}

	const result = await query(`SELECT 1 FROM achievements WHERE id = $1`, [achievementId]);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Achievement"));
	}

	return true;
};
