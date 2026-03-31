import type { Meta } from "express-validator";
import { query } from "../../../../config/database.js";
import { AuthenticatedRequest } from "../../../../shared/middlewares/authenticated.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const usernameUnique = async (username: string, meta: Meta) => {
	const userId = (meta.req as AuthenticatedRequest).user?.id;

	if (!userId) {
		return true;
	}

	const result = await query(`SELECT 1 FROM users WHERE username = $1 AND id <> $2`, [username, userId]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Username is already used");
	}

	return true;
};

