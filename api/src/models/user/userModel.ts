import { query } from "../../config/database.js";
import { ensureUserTable } from "../../database/migrations/users.js";
import { PublicUser, User } from "../../types/user.js";

export interface CreateUserPayload {
	email: string;
	password: string;
	username?: string;
}

export async function findAllUsers(): Promise<PublicUser[]> {
	const result = await query<PublicUser>(`
		SELECT
		id,
		email,
		firstname,
		lastname,
		avatar,
		username,
		role,
		account_status,
		signed_to_newsletter,
		created_at
		FROM users
	`);

	return result.rows;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
	const { password, email, username } = payload;

	await ensureUserTable();

	const result = await query<User>(
		`INSERT INTO users (email, password, username) 
			VALUES ($1, $2, $3) 
			RETURNING id, email, username, role, avatar `,
		[email, password, username],
	);

	return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User> {
	const result = await query<User>(
		`SELECT 		
		id,
		email,
		firstname,
		lastname,
		avatar,
		username,
		role  
		FROM users WHERE email = $1`,
		[email],
	);

	return result.rows[0];
}

export async function findUserById(id: number): Promise<User | null> {
	const result = await query<User>(
		`SELECT 
		id,
		email,
		firstname,
		lastname,
		avatar,
		username,
		role 
		FROM users WHERE id = $1`,
		[id],
	);

	return result.rows[0];
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

	const returningFields = `
		id, email, firstname, lastname, avatar, username,
		role, account_status, signed_to_newsletter, created_at
	`;

	const result = await query<User>(`UPDATE users SET ${setSql} WHERE id = $1 RETURNING ${returningFields}`, values);

	return result.rows[0] ?? null;
}

export async function deleteUserById(id: number) {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
}
