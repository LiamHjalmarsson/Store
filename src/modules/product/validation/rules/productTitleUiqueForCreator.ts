import type { Meta } from "express-validator";
import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";
import type { AuthenticatedRequest } from "../../../../shared/middlewares/authenticated.js";

export const productTitleUniqueForCreator = async (title: string, meta: Meta) => {
	const req = meta.req as AuthenticatedRequest;

	const creatorId = req.user?.id;

	if (!creatorId) return true;

	const result = await query(
		`SELECT 1
        FROM products
        WHERE creator_id = $1 AND LOWER(title) = LOWER($2)`,
		[creatorId, title],
	);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("You already have a product with this title");
	}

	return true;
};
