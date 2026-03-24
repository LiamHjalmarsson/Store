import { query } from "../../../config/database.js";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../types/categoryTypes.js";

const categorySelect = `
	id,
	title,
	description,
	image,
	is_featured,
	created_at,
	updated_at
`;

export const findCategoriesQuery = async () => {
	const result = await query<Category>(
		`
		SELECT
			${categorySelect}
		FROM categories
		ORDER BY created_at DESC
	`,
	);

	return result.rows;
};

export const createCategoryQuery = async (payload: CreateCategoryPayload) => {
	const { title, description, image, is_featured } = payload;

	const result = await query<Category>(
		`
			INSERT INTO categories (
				title,
				description,
				image,
				is_featured
			)
			VALUES ($1, $2, $3, $4)
			RETURNING ${categorySelect}
		`,
		[title, description ?? null, image ?? null, is_featured ?? false],
	);

	return result.rows[0];
};

export const findCategoryByIdQuery = async (id: number) => {
	const result = await query<Category>(
		`
		SELECT
			${categorySelect}
		FROM categories
		WHERE id = $1
	`,
		[id],
	);

	return result.rows[0];
};

export const updateCategoryByIdQuery = async (id: number, payload: UpdateCategoryPayload) => {
	const allowedFields = ["title", "description", "image", "is_featured"] as const;

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => payload[key] ?? null)];

	const result = await query<Category>(
		`
			UPDATE categories
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING ${categorySelect}
		`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteCategoryByIdQuery = async (id: number) => {
	const result = await query(
		`
		DELETE FROM categories
		WHERE id = $1
	`,
		[id],
	);

	return result.rowCount === 1;
};

