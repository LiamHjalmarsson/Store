import { query } from "../../config/database.js";
import { ensureAchievementsTable } from "../migrations/achievements.js";
import { achievements } from "./data/achievements.js";

export async function seedAchievements() {
	try {
		await query("DROP TABLE IF EXISTS achievements CASCADE");

		await ensureAchievementsTable();

		for (const achievement of achievements) {
			await query(
				`INSERT INTO achievements
				(code, name, description, xp_reward)
				VALUES ($1, $2, $3, $4)
				ON CONFLICT (code) DO NOTHING`,
				[achievement.code, achievement.name, achievement.description, achievement.xp_reward],
			);
		}

		console.log("Seeded Achievments items");
	} catch (err) {
		console.error("Error seeding Achievments items:", err);

		process.exit(1);
	}
}
