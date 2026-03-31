import { query } from "../../../config/database.js";
import { Profile, UpdateProfilePayload } from "../types/profile.js";

const PROFILE = `
	id,
	email,
	firstname,
	lastname,
	avatar,
	username,
	role,
	account_status,
	signed_to_newsletter,
	created_at,
	updated_at
`;

const UPDATABLE_PROFILE_FIELDS = ["firstname", "lastname", "avatar", "username", "signed_to_newsletter"] as const;

export const findProfileByUserIdQuery = async (userId: number) => {
	const result = await query<Profile>(
		`
			SELECT
				${PROFILE}
			FROM users
			WHERE id = $1
		`,
		[userId],
	);

	return result.rows[0];
};

export const updateProfileByUserIdQuery = async (userId: number, payload: UpdateProfilePayload) => {
	const fields = UPDATABLE_PROFILE_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [userId, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<Profile>(
		`
			UPDATE users
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1
			RETURNING
				${PROFILE}
		`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteProfileByUserIdQuery = async (userId: number) => {
	const result = await query("DELETE FROM users WHERE id = $1", [userId]);

	return result.rowCount === 1;
};
