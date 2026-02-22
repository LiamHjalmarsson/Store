import { query } from "../../../config/database.js";
import { Achievement, CreateAchievementPayload } from "../types/achievementTypes.js";

export async function getAllAchievements() {
	const result = await query<Achievement>(`
		SELECT * FROM achievements ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function createAchievement(data: CreateAchievementPayload) {
	const result = await query<Achievement>(
		`INSERT INTO categories (code, name, description, icon_url, xp_reward)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
		[data.code, data.name, data.description, data.icon_url, data.xp_reward],
	);

	return result.rows[0];
}

export async function awardAchievement(userId: number, achievementId: number) {
	await query(
		`INSERT INTO user_achievements (user_id, achievement_id)
		 VALUES ($1, $2)
		 ON CONFLICT DO NOTHING`,
		[userId, achievementId],
	);

	await query(
		`UPDATE users
		 SET xp = xp + (
		   SELECT xp_reward FROM achievements WHERE id = $1
		 )
		 WHERE id = $2`,
		[achievementId, userId],
	);
}
