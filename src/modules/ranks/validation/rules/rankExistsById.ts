import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import { NotFoundError } from "../../../../shared/errors/notFound.js";

export const rankExistsById = async (id: string) => {
	const rankId = Number(id);

	if (Number.isNaN(rankId) || rankId < 1) {
		throw new BadRequestError("Invalid rank ID");
	}

	const result = await query(
		`
        SELECT 1 FROM ranks 
        WHERE id = $1`,
		[rankId],
	);

	if (result.rowCount === 0) {
		throw new NotFoundError("Rank not found");
	}

	return true;
};
