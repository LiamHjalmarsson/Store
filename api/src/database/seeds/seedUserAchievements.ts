import { query } from "../../config/database.js";

export async function seedUserAchievements() {
	try {
		const users = await query(`SELECT id FROM users`);

		const achievements = await query(`SELECT id FROM achievements`);

		for (const user of users.rows) {
			for (const achievement of achievements.rows) {
				if (Math.random() > 0.5) {
					await query(
						`INSERT INTO user_achievements (user_id, achievement_id)
						 VALUES ($1, $2)
						 ON CONFLICT DO NOTHING`,
						[user.id, achievement.id],
					);
				}
			}
		}

		console.log("Seeded user achievements");
	} catch (err) {
		console.error("Error seeding user achievements:", err);
		process.exit(1);
	}
}
