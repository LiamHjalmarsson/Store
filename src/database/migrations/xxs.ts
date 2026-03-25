import { query } from "../../config/database.js";

export async function createXxTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS xxs (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	`);
}
