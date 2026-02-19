import { query } from "../../config/database.js";
import { ensureCategoryTable } from "../../database/migrations/categories.js";
import { Category } from "../../types/category.js";

export async function findAllCategories(): Promise<Category[] | null> {
	await ensureCategoryTable();

	const result = await query<Category>("SELECT * FROM categories");

	return result.rows;
}

export async function createNewCategory(data: Omit<Category, "id" | "created_at" | "updated_at">): Promise<Category> {
	await ensureCategoryTable();

	const result = await query<Category>(
		"INSERT INTO categories (title, description, image, create_at) VALUES ($1, $2, $3, $4) RETURNING *",
		[],
	);

	return result.rows[0];
}

export async function findCategoryById(id: number): Promise<Category | null> {
	await ensureCategoryTable();

	const result = await query<Category>("SELECT * FROM categories WHERE id = $1", [id]);

	return result.rows[0];
}

export async function updateCategoryById(
	id: number,
	data: Partial<Omit<Category, "id" | "created_at" | "updated_at">>,
) {}

export async function deleteCategoryById(id: number): Promise<boolean> {
	await ensureCategoryTable();

	return false;
}
