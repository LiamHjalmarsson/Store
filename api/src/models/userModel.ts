import { query } from "../config/database.js";

export type AccountStatus = "active" | "suspended" | "banned";

export interface User {
	id: number;
	email: string;
	password: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	role: "user" | "admin";
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	created_at: Date;
}

async function ensureUserTable() {
	await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstname TEXT,
      lastname TEXT,
      avatar TEXT,
      username TEXT,
      role TEXT CHECK (role IN ('user','admin')) DEFAULT 'user',
      account_status TEXT CHECK (account_status IN ('active','suspended','banned')) DEFAULT 'active',
      signed_to_newsletter BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT now()
    )
  `);
}

export async function createUser(email: string, hashedPassword: string): Promise<User> {
	await ensureUserTable();

	const result = await query<User>("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *", [
		email,
		hashedPassword,
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

export async function findAllUsers(): Promise<User[]> {
	const result = await query<User>("SELECT * FROM users");

	return result.rows;
}

export async function updateUserById(id: number, data: Partial<User>): Promise<User | null> {
	const allowed: (keyof User)[] = [
		"firstname",
		"lastname",
		"avatar",
		"username",
		"role",
		"account_status",
		"signed_to_newsletter",
	];

	const fields = allowed.filter((key) => data[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => data[key])];

	const result = await query<User>(`UPDATE users SET ${setSql} WHERE id = $1 RETURNING *`, values);

	return result.rows[0] ?? null;
}

export async function deleteUserById(id: number) {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
}
