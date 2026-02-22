import { query } from "../../config/database.js";
import { ensureRanksTable } from "../migrations/ranks.js";
import { ranks } from "./data/ranks.js";

export async function seedRanks() {
	try {
		await query("DROP TABLE IF EXISTS ranks CASCADE");

		await ensureRanksTable();

		for (const rank of ranks) {
			await query(
				`INSERT INTO ranks (name, min_xp)
				 VALUES ($1, $2)
				 ON CONFLICT DO NOTHING`,
				[rank.name, rank.min_xp],
			);
		}

		console.log("Seeded Ranks items");
	} catch (err) {
		console.error("Error seeding ranks items:", err);

		process.exit(1);
	}
}
