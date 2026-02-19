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
		`INSERT INTO categories (title, description, image)
		VALUES ($1, $2, $3)
     	RETURNING *`,
		[data.title, data.description, data.image],
	);

	return result.rows[0];
}

export async function findCategoryById(id: number): Promise<Category | null> {
	const result = await query<Category>("SELECT * FROM categories WHERE id = $1", [id]);

	return result.rows[0];
}

export async function updateCategoryById(id: number, data: Category) {
	const allowed: (keyof Omit<Category, "id" | "created_at" | "updated_at">)[] = ["title", "image", "description"];

	const fields = allowed.filter((key) => data[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => data[key])];

	const result = await query<Category>(`UPDATE categories SET ${setSql} WHERE id = $1 RETURNING *`, values);

	return result.rows[0] ?? null;
}

export async function deleteCategoryById(id: number): Promise<boolean> {
	const result = await query("DELETE FROM categories WHERE id = $1", [id]);

	return result.rowCount === 1;
}
