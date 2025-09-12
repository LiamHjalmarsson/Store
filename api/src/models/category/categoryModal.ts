import { query } from "../../config/database";
import { ensureCategoryTable } from "../../database/migrations/categories";
import { Category } from "../../types/category";

export async function createCategory(): Promise<Category> {
	await ensureCategoryTable();

	const result = await query<Category>("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", []);

	return result.rows[0];
}
