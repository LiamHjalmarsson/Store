import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const creatorExistsById = async (id: string) => {
	const creatorId = Number(id);

	if (Number.isNaN(creatorId) || creatorId < 1) {
		throw new BadRequestError("Invalid creator ID");
	}

	const result = await query(
		`
		SELECT 1
		FROM creators
		WHERE user_id = $1
	`,
		[creatorId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND("Creator"));
	}

	return true;
};
