import { query } from "../../../config/database.js";
import { PublicUser, User } from "../../../types/user.js";
import { CreateUserPayload } from "../types/userType.js";

export const findAllUsers = async () => {
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
};

export const createUser = async (payload: CreateUserPayload) => {
	const { password, email, username } = payload;

	const result = await query<User>(
		`INSERT INTO users 
			(email, password, username) 
        VALUES 
			($1, $2, $3) 
        RETURNING id, email, username, role, avatar`,
		[email, password, username],
	);

	return result.rows[0];
};

export const findUserById = async (id: number) => {
	const result = await query<PublicUser>(
		`SELECT 
			id,
			email,
			firstname,
			lastname,
			avatar,
			username,
			role 
        FROM users 
		WHERE id = $1`,
		[id],
	);

	return result.rows[0];
};

export const updateUserById = async (id: number, data: Partial<PublicUser>) => {
	const allowed: (keyof PublicUser)[] = [
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

	const result = await query<User>(
		`
		UPDATE users 
		SET ${setSql} 
		WHERE id = $1 
		RETURNING ${returningFields}`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteUserById = async (id: number) => {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
};
