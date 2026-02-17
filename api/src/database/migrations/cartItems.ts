import { query } from "../../config/database.js";

export async function ensureCartItemTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS cart_items (
			id SERIAL PRIMARY KEY,
			cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
			product_id INT REFERENCES products(id) ON DELETE CASCADE,
			quantity INT NOT NULL,
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
