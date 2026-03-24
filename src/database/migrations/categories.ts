import { query } from "../../config/database.js";

export async function categoriesTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            title TEXT UNIQUE NOT NULL,
            description TEXT,
            image TEXT,
            is_featured BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);
}
