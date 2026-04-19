import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const userExistsById = async (id: string) => {
	const userId = Number(id);

	if (Number.isNaN(userId) || userId < 1) {
		throw new BadRequestError("Invalid user ID");
	}

	const result = await query(
		`
        SELECT 1 FROM users
        WHERE 
            id = $1`,
		[userId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return true;
};
