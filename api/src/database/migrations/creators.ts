import { query } from "../../config/database.js";

export async function ensureUserAchievementsTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS creators (
            user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
            website TEXT,
            bio TEXT,
            social_twitter VARCHAR(100),
            social_instagram VARCHAR(100),
            social_youtube VARCHAR(100),

            verified_creator BOOLEAN DEFAULT FALSE,
            featured BOOLEAN DEFAULT FALSE,

            total_sales BIGINT DEFAULT 0,
            total_earnings DECIMAL(12,2) DEFAULT 0.00,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}
