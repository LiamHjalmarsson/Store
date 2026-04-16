import { query } from "../../../config/database.js";
import { UPDATE_ACHIEVEMENT_FIELDS } from "../constants/achievementFields.js";
import { Achievement, CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievement.js";
import type { AwardAchievementResponseData } from "../types/achievementResponse.js";

const ACHIEVEMENT_COLUMNS = `
	id,
	code,
	name,
	description,
	icon,
	xp_reward,
	created_at
`;

export const findAllAchievementsQuery = async () => {
	const result = await query<Achievement>(
		`
			SELECT
				${ACHIEVEMENT_COLUMNS}
			FROM achievements
			ORDER BY created_at DESC
		`,
	);

	return result.rows;
};

export const createAchievementQuery = async (payload: CreateAchievementPayload) => {
	const { code, name, xp_reward } = payload;

	const result = await query<Achievement>(
		`
			INSERT INTO achievements
				(code, name, xp_reward)
			VALUES
				($1, $2, $3)
			RETURNING
				${ACHIEVEMENT_COLUMNS}
		`,
		[code, name, xp_reward],
	);

	return result.rows[0];
};

export const updateAchievementByIdQuery = async (achievementId: number, payload: UpdateAchievementPayload) => {
	const fields = UPDATE_ACHIEVEMENT_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [achievementId, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<Achievement>(
		`
			UPDATE achievements
			SET ${setSql}
			WHERE id = $1
			RETURNING
				${ACHIEVEMENT_COLUMNS}
		`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteAchievementByIdQuery = async (achievementId: number) => {
	const result = await query(
		`
			DELETE FROM achievements
			WHERE id = $1
		`,
		[achievementId],
	);

	return result.rowCount === 1;
};

export const awardAchievementToUserQuery = async (userId: number, achievementId: number) => {
	const result = await query<AwardAchievementResponseData>(
		`
			WITH inserted AS (
				INSERT INTO user_achievements 
					(user_id, achievement_id)
				VALUES 
					($1, $2)
				ON CONFLICT DO NOTHING
				RETURNING 
					achievement_id
			),
			updated_user AS (
				UPDATE users
				SET xp = users.xp + achievements.xp_reward
				FROM inserted
				JOIN achievements ON achievements.id = inserted.achievement_id
				WHERE users.id = $1
				RETURNING users.id
			)
			SELECT EXISTS (SELECT 1 FROM inserted) AS awarded
		`,
		[userId, achievementId],
	);

	return result.rows[0] ?? { awarded: false };
};

export const findAchievementsByUserIdQuery = async (userId: number) => {
	const result = await query<Achievement>(
		`
			SELECT
				a.id,
				a.code,
				a.name,
				a.description,
				a.icon,
				a.xp_reward,
				a.created_at
			FROM achievements a
			JOIN user_achievements ua ON a.id = ua.achievement_id
			WHERE ua.user_id = $1
			ORDER BY ua.earned_at DESC
		`,
		[userId],
	);

	return result.rows;
};
