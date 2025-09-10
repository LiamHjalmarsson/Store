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
