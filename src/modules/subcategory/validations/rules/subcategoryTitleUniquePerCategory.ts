import type { Meta } from "express-validator";
import { query } from "../../../../config/database.js";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const subcategoryTitleUniquePerCategory = async (title: string, { req }: Meta) => {
	const subcategoryId = req.params?.id ? Number(req.params.id) : null;

	let categoryId = req.body?.category_id !== undefined ? Number(req.body.category_id) : null;

	if (
		(categoryId === null || Number.isNaN(categoryId) || categoryId < 1) &&
		subcategoryId &&
		!Number.isNaN(subcategoryId)
	) {
		const currentSubcategory = await query<{ category_id: number }>(
			`
				SELECT category_id
				FROM subcategories
				WHERE id = $1
			`,
			[subcategoryId],
		);

		categoryId = currentSubcategory.rows[0]?.category_id ?? null;
	}

	if (categoryId === null || Number.isNaN(categoryId) || categoryId < 1) {
		throw new BadRequestError("Valid category_id is required");
	}

	const result = await query(
		`
			SELECT 1
			FROM subcategories
			WHERE category_id = $1
				AND LOWER(title) = LOWER($2)
				AND ($3::int IS NULL OR id <> $3)
		`,
		[categoryId, title, subcategoryId],
	);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Subcategory title already exists for this category");
	}

	return true;
};
