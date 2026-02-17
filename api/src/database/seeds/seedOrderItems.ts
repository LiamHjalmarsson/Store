import { query } from "../../config/database.js";
import { ensureOrderItemTable } from "../migrations/orderItems.js";

export async function seedOrderItems() {
	try {
		await query("DROP TABLE IF EXISTS order_items CASCADE");

		await ensureOrderItemTable();

		await query(
			`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
			 (1, 1, 1, 1299.99),
			 (1, 2, 1, 39.99),
			 (2, 3, 1, 19.99)`
		);

		console.log("Seeded order items");
	} catch (err) {
		console.error("Error seeding order items:", err);

		process.exit(1);
	}
}
