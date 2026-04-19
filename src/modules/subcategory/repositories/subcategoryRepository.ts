import { query } from "../../../config/database.js";
import { SUBCATEGORY_FIELDS } from "../constants/subcategoryFields.js";
import { CreateSubcategoryPayload, Subcategory, UpdateSubcategoryPayload } from "../types/subcategory.js";

const SUBCATEGORY_COLUMNS = `
	id,
	title,
	category_id,
	description,
	created_at
`;

export const findAllSubcategoriesQuery = async (categoryId?: number) => {
	if (categoryId !== undefined) {
		const result = await query<Subcategory>(
			`
				SELECT
					${SUBCATEGORY_COLUMNS}
				FROM subcategories
				WHERE category_id = $1
				ORDER BY created_at DESC
			`,
			[categoryId],
		);

		return result.rows;
	}

	const result = await query<Subcategory>(`
		SELECT
			${SUBCATEGORY_COLUMNS}
		FROM subcategories
		ORDER BY created_at DESC
	`);

	return result.rows;
};

export const createSubcategoryQuery = async (payload: CreateSubcategoryPayload) => {
	const result = await query<Subcategory>(
		`
			INSERT INTO subcategories
				(title, category_id, description)
			VALUES
				($1, $2, $3)
			RETURNING
				${SUBCATEGORY_COLUMNS}
		`,
		[payload.title, payload.category_id, payload.description ?? null],
	);

	return result.rows[0];
};

export const findSubcategoryByIdQuery = async (id: number) => {
	const result = await query<Subcategory>(
		`
			SELECT
				${SUBCATEGORY_COLUMNS}
			FROM subcategories
			WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
};

export const updateSubcategoryByIdQuery = async (id: number, payload: UpdateSubcategoryPayload) => {
	const fields = SUBCATEGORY_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [id, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<Subcategory>(
		`
			UPDATE subcategories
			SET ${setSql}
			WHERE id = $1
			RETURNING
				${SUBCATEGORY_COLUMNS}
		`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteSubcategoryByIdQuery = async (id: number) => {
	const result = await query(`DELETE FROM subcategories WHERE id = $1`, [id]);

	return result.rowCount === 1;
};
