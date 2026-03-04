import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const rankNameUnique = async (name: string) => {
	const result = await query(
		`
        SELECT 1 FROM ranks 
        WHERE LOWER(name) = LOWER($1)`,
		[name],
	);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Rank name already exists");
	}

	return true;
};
