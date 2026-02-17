import { query } from "../../config/database.js";
import { ensureOrderTable } from "../migrations/orders.js";

export async function seedOrders() {
	try {
		await query("DROP TABLE IF EXISTS orders CASCADE");

		await ensureOrderTable();

		await query(
			`INSERT INTO orders (user_id, total, status) VALUES
			 (1, 1339.98, 'paid'),
			 (2, 19.99, 'pending')`
		);

		console.log("Seeded orders");
	} catch (err) {
		console.error("Error seeding orders:", err);

		process.exit(1);
	}
}
