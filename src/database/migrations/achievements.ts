import { query } from "../../config/database.js";

export async function ensureAchievementsTable() {
	await query(`
		CREATE TABLE IF NOT EXISTS achievements (
			id SERIAL PRIMARY KEY,
            code VARCHAR(100) UNIQUE NOT NULL,
            name VARCHAR(150) NOT NULL,
            description TEXT,
            icon TEXT,
            xp_reward INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT now()
		)
	`);
}
