/* eslint-disable no-console */
import { query } from "../../config/database.js";

export async function seedUserAchievements() {
	try {
		const users = await query(`SELECT id FROM users`);

		const achievements = await query(`SELECT id FROM achievements`);

		let awardedCount = 0;

		for (const user of users.rows) {
			for (const achievement of achievements.rows) {
				if ((user.id + achievement.id) % 2 !== 0) {
					continue;
				}

				const result = await query(
					`WITH inserted AS (
						INSERT INTO user_achievements
							(user_id, achievement_id)
						VALUES
							($1, $2)
						ON CONFLICT DO NOTHING
						RETURNING achievement_id
					),
					updated_user AS (
						UPDATE users
						SET xp = users.xp + achievements.xp_reward
						FROM inserted
						JOIN achievements ON achievements.id = inserted.achievement_id
						WHERE users.id = $1
						RETURNING users.id
					)
					SELECT EXISTS (SELECT 1 FROM inserted) AS awarded`,
					[user.id, achievement.id],
				);

				if (result.rows[0]?.awarded) {
					awardedCount += 1;
				}
			}
		}

		console.log(`Seeded user achievements: ${awardedCount} new awards`);
	} catch (err) {
		console.error("Error seeding user achievements:", err);
		process.exit(1);
	}
}
