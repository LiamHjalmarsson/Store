import { query } from "../../config/database.js";
import { ensureCreatorsTable } from "../migrations/creators.js";

export async function seedCreators() {
	try {
		await query("DROP TABLE IF EXISTS creators CASCADE");

		await ensureCreatorsTable();

		const creators = await query(`SELECT id FROM users WHERE role = 'creator'`);

		for (const creator of creators.rows) {
			await query(
				`INSERT INTO creators
				(user_id, website, bio, verified_creator, featured, total_sales, total_earnings)
				VALUES ($1, $2, $3, $4, $5, $6, $7)
				ON CONFLICT (user_id) DO NOTHING`,
				[
					creator.id,
					"https://example.com",
					"Professional marketplace creator",
					true,
					false,
					Math.floor(Math.random() * 200),
					Math.floor(Math.random() * 10000),
				],
			);
		}

		console.log("Seeded creators");
	} catch (err) {
		console.error("Error seeding creators:", err);
		process.exit(1);
	}
}
