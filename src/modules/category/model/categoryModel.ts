import { query } from "../../../config/database.js";
import { Category, CreateCategoryPayload, UpdateCategoryPayload } from "../types/categoryTypes.js";

export async function findAllCategories(): Promise<Category[] | null> {
	const result = await query<Category>(`SELECT 
        id,
        title,
        description,
        image,
        is_featured
        FROM categories
		ORDER BY created_at DESC`);

	return result.rows;
}

export async function createNewCategory(data: CreateCategoryPayload): Promise<Category> {
	const result = await query<Category>(
		`INSERT INTO categories (title, description, image, is_featured)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
		[data.title, data.description, data.image, data.is_featured ?? false],
	);

	return result.rows[0];
}

export async function findCategoryById(id: number): Promise<Category | null> {
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
}

export async function updateCategoryById(id: number, data: UpdateCategoryPayload) {
	const allowed = ["title", "description", "image", "is_featured"] as const;

	const fields = allowed.filter((key) => data[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => data[key])];

	const result = await query<Category>(
		`UPDATE categories 
		SET ${setSql} 
		WHERE id = $1 
		RETURNING *`,
		values,
	);

	return result.rows[0] ?? null;
}

export async function deleteCategoryById(id: number): Promise<boolean> {
	const result = await query(
		`
		DELETE FROM categories 
		WHERE id = $1`,
		[id],
	);

	return result.rowCount === 1;
}
