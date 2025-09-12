import { query } from "../../config/database.js";

export async function ensureCategoryTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            title TEXT UNIQUE NOT NULL,
            description TEXT,
            image TEXT,
            created_at TIMESTAMP DEFAULT now()
        )
    `);
}
