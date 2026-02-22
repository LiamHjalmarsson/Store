import { query } from "../../config/database.js";
import { ensureAchievementsTable } from "../migrations/achievements.js";

export async function seedAchievements() {
	try {
		await query("DROP TABLE IF EXISTS achievements CASCADE");

		await ensureAchievementsTable();

		const achievements = [
			{
				code: "FIRST_PURCHASE",
				name: "First Purchase",
				description: "Completed your first purchase",
				xp_reward: 100,
			},
			{
				code: "FIRST_SALE",
				name: "First Sale",
				description: "Sold your first product",
				xp_reward: 250,
			},
			{
				code: "TOP_CREATOR",
				name: "Top Creator",
				description: "Reached 100 sales",
				xp_reward: 1000,
			},
			{
				code: "PROFILE_COMPLETE",
				name: "Profile Complete",
				description: "Completed your creator profile",
				xp_reward: 150,
			},
		];

		for (const achievement of achievements) {
			await query(
				`INSERT INTO achievements
				(code, name, description, xp_reward)
				VALUES ($1,$2,$3,$4)
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
