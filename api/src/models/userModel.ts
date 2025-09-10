import { query } from "../config/database.js";

export interface User {
	id: number;
	email: string;
	password: string;
	created_at: Date;
}

async function ensureUserTable() {
	await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
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
