import type { Meta } from "express-validator";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { query } from "../../../../config/database.js";

export const usernameUnique = async (username: string, meta: Meta) => {
	const userId = meta.req.params?.id ? Number(meta.req.params.id) : null;

	if (!userId || Number.isNaN(userId) || userId < 1) {
		return true;
	}

	const result = await query(`SELECT 1 FROM users WHERE username = $1 AND id <> $2`, [username, userId]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Username is already used");
	}

	return true;
};
