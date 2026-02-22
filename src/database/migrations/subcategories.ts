import { query } from "../../config/database.js";

export async function ensureSubcategoryTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS subcategories (
			id SERIAL PRIMARY KEY,
			title TEXT NOT NULL,
			category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
			description TEXT,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			CONSTRAINT unique_subcategory_per_category UNIQUE (category_id, title)
		);
	`);
}
