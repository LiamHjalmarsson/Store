import { query } from "../../config/database.js";
import { ensurePaymentTable } from "../migrations/payments.js";

export async function seedPayments() {
	try {
		await query("DROP TABLE IF EXISTS payments CASCADE");

		await ensurePaymentTable();

		await query(
			`INSERT INTO payments (order_id, provider, transaction_id, amount, status) VALUES
			 (1, 'stripe', 'txn_123456', 1339.98, 'paid'),
			 (2, 'paypal', 'txn_987654', 19.99, 'pending')`
		);

		console.log("Seeded payments");
	} catch (err) {
		console.error("Error seeding payments:", err);

		process.exit(1);
	}
}
