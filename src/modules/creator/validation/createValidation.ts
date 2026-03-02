import { body, CustomValidator } from "express-validator";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { query } from "../../../config/database.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

const notAlreadyCreator: CustomValidator = async (_, { req }) => {
	const userId = (req as AuthenticatedRequest).user?.id;

	if (!userId) {
		throw new BadRequestError("Authentication required");
	}

	const result = await query(`SELECT 1 FROM creators WHERE user_id = $1`, [userId]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("You are already a creator");
	}

	console.log(result.rows);

	return true;
};

export const becomeCreatorValidation = validateRequest([body().custom(notAlreadyCreator)]);
