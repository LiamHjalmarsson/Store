import { query } from "../../config/database.js";

export async function ensurePaymentTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS payments (
			id SERIAL PRIMARY KEY,
			order_id INT REFERENCES orders(id) ON DELETE CASCADE,
			provider TEXT NOT NULL,
			transaction_id TEXT UNIQUE,
			amount NUMERIC(10,2) NOT NULL,
			status TEXT CHECK (status IN ('pending','paid','failed','refunded')) DEFAULT 'pending',
			created_at TIMESTAMP DEFAULT now()
		)
	`);
}
