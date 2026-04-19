import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";
import { ACHIEVEMENT_MESSAGES } from "../../constants/achievementMessages.js";

export const achievementExistsById = async (id: string | number) => {
	const achievementId = Number(id);

	if (Number.isNaN(achievementId) || achievementId < 1) {
		throw new BadRequestError(ACHIEVEMENT_MESSAGES.INVALID_ID);
	}

	const result = await query(`SELECT 1 FROM achievements WHERE id = $1`, [achievementId]);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return true;
};
