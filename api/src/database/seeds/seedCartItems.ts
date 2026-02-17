import { query } from "../../config/database.js";
import { ensureCartItemTable } from "../migrations/cartItems.js";

export async function seedCartItems() {
	try {
		await query("DROP TABLE IF EXISTS cart_items CASCADE");

		await ensureCartItemTable();

		await query(
			`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
			 (1, 1, 1),
			 (2, 2, 2),
			 (3, 3, 1)`
		);

		console.log("Seeded cart items");
	} catch (err) {
		console.error("Error seeding cart items:", err);

		process.exit(1);
	}
}
