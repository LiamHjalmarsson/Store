import { query } from "../../config/database.js";

export async function ensureUserAchievementsTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS user_achievements (
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            achievement_id  INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, achievement_id)
        )
    `);
}
