import { query } from "../../../config/database.js";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../types/category.js";

const CATEGORY = `
	id,
	title,
	description,
	image,
	is_featured,
	created_at,
	updated_at
`;

const UPDATABLE_CATEGORY_FIELDS = ["title", "description", "image", "is_featured"] as const;

export const findCategoriesQuery = async () => {
	const result = await query<Category>(
		`
		SELECT
			${CATEGORY}
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
			RETURNING ${CATEGORY}
		`,
		[title, description ?? null, image ?? null, is_featured ?? false],
	);

	return result.rows[0];
};

export const findCategoryByIdQuery = async (id: number) => {
	const result = await query<Category>(
		`
		SELECT
			${CATEGORY}
		FROM categories
		WHERE id = $1
	`,
		[id],
	);

	return result.rows[0];
};

export const updateCategoryByIdQuery = async (id: number, payload: UpdateCategoryPayload) => {
	const fields = UPDATABLE_CATEGORY_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [id, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<Category>(
		`
			UPDATE categories
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING ${CATEGORY}
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
