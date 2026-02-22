import { query } from "../../../config/database.js";
import { PublicUser, User } from "../../../types/user.js";

export async function findUserById(id: number): Promise<PublicUser | null> {
	const result = await query<PublicUser>(
		`SELECT 
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
		WHERE id = $1`,
		[id],
	);

	return result.rows[0];
}

export async function updateUserById(id: number, data: Partial<PublicUser>): Promise<PublicUser | null> {
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

	const result = await query<User>(`UPDATE users SET ${setSql} WHERE id = $1 RETURNING ${returningFields}`, values);

	return result.rows[0] ?? null;
}

export async function deleteUserById(id: number) {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
}
