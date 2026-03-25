import { query } from "../../../config/database.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { PublicUser } from "../../../shared/types/user.js";
import { CreateNewUserPayload, UpdateUserPayload } from "../types/userType.js";

const publicUserSelect = `
	id,
	email,
	firstname,
	lastname,
	avatar,
	bio,
	username,
	xp,
	role,
	account_status,
	signed_to_newsletter,
	last_login,
	created_at,
	updated_at
`;

export const findAllUsers = async (pagination: PaginationQuery) => {
	const totalResult = await query<{ count: string }>(`
        SELECT COUNT(*)::text AS count
        FROM users
    `);

	const total = Number(totalResult.rows[0].count);

	const result = await query<PublicUser>(
		`
        SELECT
			${publicUserSelect}
        FROM users
        ORDER BY created_at DESC
        LIMIT $1
        OFFSET $2
    `,
		[pagination.limit, pagination.offset],
	);

	const totalPages = Math.ceil(total / pagination.limit);

	return {
		items: result.rows,
		total,
		page: pagination.page,
		limit: pagination.limit,
		totalPages,
	};
};

export const createNewUser = async (payload: CreateNewUserPayload) => {
	const {
		email,
		password,
		username,
		firstname = null,
		lastname = null,
		avatar = null,
		role = "user",
		account_status = "active",
		signed_to_newsletter = false,
	} = payload;

	const normalizedEmail = String(email).trim().toLowerCase();

	const result = await query<PublicUser>(
		`INSERT INTO users (
				email,
				password,
				username,
				firstname,
				lastname,
				avatar,
				role,
				account_status,
				signed_to_newsletter
			)
			VALUES
				($1,$2,$3,$4,$5,$6,$7,$8,$9)
			RETURNING ${publicUserSelect}`,
		[normalizedEmail, password, username, firstname, lastname, avatar, role, account_status, signed_to_newsletter],
	);

	return result.rows[0];
};

export const findUserById = async (id: number) => {
	const result = await query<PublicUser>(
		`SELECT 
			${publicUserSelect}
        FROM users 
		WHERE id = $1`,
		[id],
	);

	return result.rows[0];
};

export const updateUserById = async (id: number, data: UpdateUserPayload) => {
	const allowed = [
		"firstname",
		"lastname",
		"avatar",
		"username",
		"role",
		"account_status",
		"signed_to_newsletter",
	] as const;

	const fields = allowed.filter((key) => data[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((key) => data[key] ?? null)];

	const result = await query<PublicUser>(
		`
			UPDATE users 
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1 
			RETURNING ${publicUserSelect}`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteUserById = async (id: number) => {
	const result = await query("DELETE FROM users WHERE id = $1", [id]);

	return result.rowCount;
};

