import { query } from "../../config/database.js";
import { ensureCategoryTable } from "../migrations/categories.js";

export async function seedCategories() {
	try {
		await query("DROP TABLE IF EXISTS categories CASCADE");

		await ensureCategoryTable();

		const categories = [
			{
				title: "Electronics",
				description: "Gadgets and devices",
				image: "electronics.jpg",
			},
			{
				title: "Books",
				description: "Fiction and non-fiction books",
				image: "books.jpg",
			},
			{
				title: "Clothing",
				description: "dd",
				image: "clothing.jpg",
			},
		];

		for (const category of categories) {
			await query(
				`INSERT INTO categories 
                (title, description, image)
                VALUES ($1,$2,$3)
				ON CONFLICT (title) DO NOTHING`,
				[category.title, category.description, category.image]
			);

			console.log(`Inserted category: ${category.title}`);
		}
	} catch (err) {
		console.error("Error seeding categories:", err);

		process.exit(1);
	}
}
