import { query } from "../../config/database.js";

export async function ensureRanksTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS ranks (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            min_xp INTEGER NOT NULL,
            badge_url TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}
