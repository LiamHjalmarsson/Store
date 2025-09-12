import { query } from "../config/database.js";
import { ensureUserTable } from "../database/migrations/users.js";
import { User } from "../types/user.js";

export async function findAllUsers(): Promise<User[]> {
	const result = await query<User>("SELECT * FROM users");

	return result.rows;
}

export async function createUser(email: string, password: string): Promise<User> {
	await ensureUserTable();

	const result = await query<User>("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [
		email,
		password,
	]);

	return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User> {
	const result = await query<User>("SELECT * FROM users WHERE email = $1", [email]);

	return result.rows[0];
}

export async function findUserById(id: number): Promise<User | null> {
	const result = await query<User>("SELECT * FROM users WHERE id = $1", [id]);

	return result.rows[0];
}

export async function updateUserById(id: number, data: Partial<User>): Promise<User | null> {
	const fields = Object.keys(data);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [id, ...fields.map((field) => (data as any)[field])];

	const result = await query<User>(`UPDATE users SET ${setSql} WHERE id = $1 RETURNING *`, values);

	return result.rows[0] ?? null;
}

export async function deleteUserById(id: number) {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
}
