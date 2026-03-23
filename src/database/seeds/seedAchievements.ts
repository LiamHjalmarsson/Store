import { query } from "../../config/database.js";
import { achievements } from "./data/achievements.js";

export async function seedAchievements() {
	try {
		for (const achievement of achievements) {
			await query(
				`INSERT INTO achievements
				(
					code,
					name,
					description,
					icon,
					xp_reward
				)
				VALUES 
					($1, $2, $3, $4, $5)
				ON CONFLICT (code) DO NOTHING`,
				[achievement.code, achievement.name, achievement.description, achievement.icon, achievement.xp_reward],
			);
		}

		console.log("Seeded achievements");
	} catch (err) {
		console.error("Error seeding achievements:", err);

		process.exit(1);
	}
}

