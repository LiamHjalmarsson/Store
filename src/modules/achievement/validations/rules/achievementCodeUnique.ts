import type { Meta } from "express-validator";
import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const achievementCodeUnique = async (code: string, meta: Meta) => {
	const achievementId = meta.req.params?.id ? Number(meta.req.params.id) : null;

	let result;

	if (achievementId) {
		result = await query(`SELECT 1 FROM achievements WHERE code = $1 AND id <> $2`, [code, achievementId]);
	} else {
		result = await query(`SELECT 1 FROM achievements WHERE code = $1`, [code]);
	}

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Achievement code already exists");
	}

	return true;
};
