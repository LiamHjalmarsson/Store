import { query } from "../../config/database.js";
import { subcategories } from "./data/subcategories.js";

export async function seedSubcategories() {
	const categories = await query(`SELECT id, title FROM categories`);

	for (const category of categories.rows) {
		const match = subcategories.find((c) => c.category === category.title);

		if (!match) return;

		for (const sub of match.items) {
			await query(
				`INSERT INTO subcategories 
					(category_id, title, description)
                VALUES 
				 	($1, $2, $3)
                ON CONFLICT 
					(category_id, title) 
				DO NOTHING`,
				[category.id, sub.title, sub.description],
			);

			console.log(`Inserted subcategory: ${sub.title} for ${category.title}`);
		}
	}
}
