import { query } from "../../config/database.js";
import { ensureSubcategoryTable } from "../migrations/subcategories.js";

export async function seedSubcategories() {
	await query("DROP TABLE IF EXISTS subcategories CASCADE");

	await ensureSubcategoryTable();

	const categories = await query(`SELECT id, title FROM categories`);

	for (const category of categories.rows) {
		const subcats = ["Templates", "UI Kits", "Icons", "Plugins"];

		for (const sub of subcats) {
			await query(
				`INSERT INTO subcategories (category_id, title)
                 VALUES ($1,$2)
                 ON CONFLICT (category_id, title) DO NOTHING`,
				[category.id, sub],
			);

			console.log(`Inserted subcategory: ${sub} for ${category.title}`);
		}
	}
}
