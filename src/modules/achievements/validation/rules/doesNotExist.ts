import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const achievementDoesNotExist = async (achievement: string) => {
	const result = await query(`SELECT 1 FROM achievements WHERE name = $1`, [achievement]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Achievement already exists");
	}

	return true;
};
