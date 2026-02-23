import { query } from "../../../config/database.js";
import { Achievement, CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export const findAllAchievements = async () => {
	const result = await query<Achievement>(`
		SELECT * 
		FROM achievements 
		ORDER BY created_at DESC
	`);

	return result.rows;
};

export const createNewAchievement = async (payload: CreateAchievementPayload) => {
	const { code, name, icon, xp_reward } = payload;

	const result = await query<Achievement>(
		`
		INSERT INTO achievements 
			(code, name, icon, xp_reward)
		VALUES 
			($1, $2, $3, $4)
		RETURNING *`,
		[code, name, icon, xp_reward ?? false],
	);

	return result.rows[0];
};

export const updateAchievementById = async (id: number, payload: UpdateAchievementPayload) => {
	const allowedFields: (keyof UpdateAchievementPayload)[] = ["code", "name", "icon", "xp_reward"];

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

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
};

export const deleteAchievementById = async (id: number) => {
	const result = await query(
		`
		DELETE FROM achievements 
		WHERE id = $1
		`,
		[id],
	);

	return result.rowCount === 1;
};

export const awardAchievementToUser = async (userId: number, achievement_id: number) => {
	await query(
		`INSERT INTO user_achievements
			(user_id, achievement_id)
		 VALUES 
		 	($1, $2)
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
};

export const findUserAchievements = async (userId: number) => {
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
};
