import type { Meta } from "express-validator";
import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const achievementNameUnique = async (name: string, meta: Meta) => {
	const achievementId = meta.req.params?.id ? Number(meta.req.params.id) : null;

	let result;
	if (achievementId) {
		result = await query(`SELECT 1 FROM achievements WHERE name = $1 AND id <> $2`, [name, achievementId]);
	} else {
		result = await query(`SELECT 1 FROM achievements WHERE name = $1`, [name]);
	}

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Achievement name already exists");
	}

	return true;
};
