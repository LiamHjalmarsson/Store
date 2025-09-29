import { query } from "../../config/database.js";

export async function ensureCartTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS carts (
			id SERIAL PRIMARY KEY,
			user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
