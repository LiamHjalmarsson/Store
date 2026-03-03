import { query } from "../../../config/database.js";
import { PublicUser } from "../../../shared/types/user.js";

export const findUserById = async (id: number) => {
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
};

export const updateUserById = async (id: number, payload: Partial<PublicUser>) => {
	const allowedFields: (keyof PublicUser)[] = ["firstname", "lastname", "avatar", "username", "signed_to_newsletter"];

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => payload[key] ?? null)];

	const returningFields = `
        id, email, firstname, lastname, avatar, username,
        signed_to_newsletter, created_at
    `;

	const result = await query<PublicUser>(
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
