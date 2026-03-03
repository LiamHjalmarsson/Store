import { query } from "../../../config/database.js";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../types/categoryTypes.js";

export const findAllCategories = async () => {
	const result = await query<Category>(`
		SELECT 
			id,
			title,
			description,
			image,
			is_featured
        FROM categories
		ORDER BY created_at DESC`);

	return result.rows;
};

export const createNewCategory = async (payload: CreateCategoryPayload) => {
	const { title, description, image, is_featured } = payload;

	const result = await query<Category>(
		`INSERT INTO categories 
			(title, description, image, is_featured)
        VALUES 
			($1, $2, $3, $4)
        RETURNING *`,
		[title, description ?? null, image ?? null, is_featured ?? false],
	);

	return result.rows[0];
};

export const findCategoryById = async (id: number) => {
	const result = await query<Category>(
		`SELECT 		
			id,
			title,
			description,
			image,
			is_featured 
		FROM categories 
		WHERE id = $1`,
		[id],
	);

	return result.rows[0];
};

export const updateCategoryById = async (id: number, payload: UpdateCategoryPayload) => {
	const allowedFields: (keyof UpdateCategoryPayload)[] = ["title", "description", "image", "is_featured"];

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => payload[key] ?? null)];

	const result = await query<Category>(
		`UPDATE categories 
		SET ${setSql} 
		WHERE id = $1 
		RETURNING *`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteCategoryById = async (id: number) => {
	const result = await query(
		`
		DELETE FROM categories 
		WHERE id = $1`,
		[id],
	);

	return result.rowCount === 1;
};
