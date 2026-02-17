import { query } from "../../config/database.js";

export async function ensureProductTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS products (
			id SERIAL PRIMARY KEY,
			title TEXT UNIQUE NOT NULL,
			description TEXT,
			price NUMERIC(10,2) NOT NULL,
			stock INT DEFAULT 0,
			image TEXT,
			category_id INT REFERENCES categories(id) ON DELETE SET NULL,
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
