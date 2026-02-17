import { query } from "../../config/database.js";
import { ensureCartTable } from "../migrations/carts.js";

export async function seedCarts() {
	try {
		await query("DROP TABLE IF EXISTS carts CASCADE");

		await ensureCartTable();

		await query(`INSERT INTO carts (user_id) VALUES (1), (2), (3)`);

		console.log("Seeded carts");
	} catch (err) {
		console.error("Error seeding carts:", err);

		process.exit(1);
	}
}
