import { query } from "../../config/database.js";
import { hashPassword } from "../../utils/password.js";
import { ensureUserTable } from "../migrations/users.js";

export async function seedUsers() {
	try {
		await query("DROP TABLE IF EXISTS users CASCADE");

		await ensureUserTable();

		const users = [
			{
				email: "anna@example.com",
				password: "password123",
				firstname: "Anna",
				lastname: "Svensson",
				avatar: "https://i.pravatar.cc/150?img=1",
				username: "annasv",
				role: "user",
				account_status: "active",
				signed_to_newsletter: true,
			},
			{
				email: "liam@example.com",
				password: "secret456",
				firstname: "Liam",
				lastname: "Hjalmarsson",
				avatar: "https://i.pravatar.cc/150?img=2",
				username: "liamh",
				role: "admin",
				account_status: "active",
				signed_to_newsletter: false,
			},
			{
				email: "maria@example.com",
				password: "welcome789",
				firstname: "Maria",
				lastname: "Karlsson",
				avatar: "https://i.pravatar.cc/150?img=3",
				username: "mariak",
				role: "user",
				account_status: "suspended",
				signed_to_newsletter: true,
			},
		];

		for (const user of users) {
			const hashed = await hashPassword(user.password);

			await query(
				`INSERT INTO users 
                (email, password, firstname, lastname, avatar, username, role, account_status, signed_to_newsletter)
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
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
				]
			);

			console.log(`Seeded user: ${user.email}`);
		}
	} catch (err) {
		console.error("Error seeding users:", err);

		process.exit(1);
	}
}
