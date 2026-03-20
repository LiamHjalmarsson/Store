import { query } from "../../config/database.js";

export async function createVideoTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS videos (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`);
}
