import { query } from "../../config/database.js";
import { hashPassword } from "../../utils/password.js";
import { ensureUserTable } from "../migrations/users.js";
import { usersData } from "./data/users.js";

export async function seedUsers() {
	try {
		await query("DROP TABLE IF EXISTS users CASCADE");

		await ensureUserTable();

		const users = usersData;

		for (const user of users) {
			const hashed = await hashPassword(user.password);

			await query(
				`INSERT INTO users 
                (email, password, firstname, lastname, avatar, username, role, account_status, signed_to_newsletter)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (email) DO NOTHING`,
				[
					user.email,
					hashed,
					user.firstname,
					user.lastname,
					user.avatar,
					user.username,
					user.role,
					user.account_status,
					user.signed_to_newsletter,
				],
			);

			console.log(`Seeded user: ${user.email}`);
		}
	} catch (err) {
		console.error("Error seeding users:", err);

		process.exit(1);
	}
}
