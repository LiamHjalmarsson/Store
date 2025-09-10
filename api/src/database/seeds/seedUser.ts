import { ensureUserTable } from "../migrations/users";
import { createUser } from "../../models/userModel";
import { hashPassword } from "../../utils/password";

async function seedUsers() {
	try {
		await ensureUserTable();

		const users = [
			{ email: "anna@example.com", password: "password123" },
			{ email: "eva@example.com", password: "password123" },
			{ email: "maria@example.com", password: "password123" },
		];

		for (const user of users) {
			const hashed = await hashPassword(user.password);

			const created = await createUser(user.email, hashed);

			console.log(`Seeded user: ${created.email}`);
		}

		process.exit(0);
	} catch (err) {
		console.error("Error seeding users:", err);
		process.exit(1);
	}
}

seedUsers();
