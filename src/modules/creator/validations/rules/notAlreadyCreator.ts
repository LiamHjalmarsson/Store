import { CustomValidator } from "express-validator";
import { query } from "../../../../config/database.js";
import { ERROR_MESSAGES } from "../../../../shared/constants/errorMessages.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { AuthenticatedRequest } from "../../../../shared/middlewares/authenticated.js";

export const notAlreadyCreator: CustomValidator = async (_, { req }) => {
	const userId = (req as AuthenticatedRequest).user?.id;

	if (!userId) {
		throw new BadRequestError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	const result = await query(`SELECT 1 FROM creators WHERE user_id = $1`, [userId]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("You are already a creator");
	}

	return true;
};

