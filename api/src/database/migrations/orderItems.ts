import { query } from "../../config/database.js";

export async function ensureOrderItemTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS order_items (
			id SERIAL PRIMARY KEY,
			order_id INT REFERENCES orders(id) ON DELETE CASCADE,
			product_id INT REFERENCES products(id) ON DELETE CASCADE,
			quantity INT NOT NULL,
			price NUMERIC(10,2) NOT NULL,
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
