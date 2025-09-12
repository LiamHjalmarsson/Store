import { query } from "../../config/database";
import { ensureCategoryTable } from "../../database/migrations/categories";
import { Category } from "../../types/category";

export async function createCategory(): Promise<Category> {
	await ensureCategoryTable();

	const result = await query<Category>(
		"INSERT INTO categories (title, description, image, create_at) VALUES ($1, $2, $3, $4) RETURNING *",
		[]
	);

	return result.rows[0];
}
