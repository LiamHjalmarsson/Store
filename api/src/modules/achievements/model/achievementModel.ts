import { query } from "../../../config/database.js";
import { Achievement, CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export async function getAllAchievements() {
	const result = await query<Achievement>(`
		SELECT * FROM achievements ORDER BY created_at DESC
	`);

	return result.rows;
}

export async function createAchievement(payload: CreateAchievementPayload) {
	const result = await query<Achievement>(
		`INSERT INTO achievements (code, name, icon, xp_reward)
		VALUES ($1, $2, $3, $4)
		RETURNING *`,
		[payload.code, payload.name, payload.icon, payload.xp_reward ?? false],
	);

	return result.rows[0];
}

export async function updateAchievement(id: number, payload: UpdateAchievementPayload) {
	const allowed = ["code", "name", "icon", "xp_reward"] as const;

	const fields = allowed.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => payload[key])];

	const result = await query<Achievement>(
		`UPDATE achievements 
		SET ${setSql} 
		WHERE id = $1 
		RETURNING *`,
		values,
	);

	return result.rows[0] ?? null;
}

export async function deleteAchievement(id: number) {
	const result = await query(
		`
		DELETE FROM achievements 
		WHERE id = $1`,
		[id],
	);

	return result.rowCount === 1;
}

export async function awardAchievement(userId: number, achievement_id: number) {
	await query(
		`INSERT INTO user_achievements (user_id, achievement_id)
		 VALUES ($1, $2)
		 ON CONFLICT DO NOTHING`,
		[userId, achievement_id],
	);

	await query(
		`UPDATE users
		 SET xp = xp + (
		   SELECT xp_reward FROM achievements WHERE id = $1
		 )
		 WHERE id = $2`,
		[achievement_id, userId],
	);
}

export async function getUserAchievements(userId: number) {
	const result = await query<Achievement>(
		`
		SELECT a.*
		FROM achievements a
		JOIN user_achievements ua ON a.id = ua.achievement_id
		WHERE ua.user_id = $1
		ORDER BY ua.earned_at DESC
	`,
		[userId],
	);

	return result.rows;
}
