import { query } from "../../config/database.js";

export async function ensureOrderTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS orders (
			id SERIAL PRIMARY KEY,
			user_id INT REFERENCES users(id) ON DELETE CASCADE,
			total NUMERIC(10,2) NOT NULL,
			status TEXT CHECK (status IN ('pending','paid','shipped','completed','cancelled')) DEFAULT 'pending',
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
