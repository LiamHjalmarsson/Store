import { query } from "../../../config/database.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { PublicUser } from "../../../shared/types/user.js";
import { paginationResult } from "../../../shared/utils/http/pagination.js";
import { UPDATE_USER_FIELDS } from "../constants/userFields.js";
import { CreateUserPayload, UpdateUserPayload } from "../types/user.js";

const PUBLIC_USER_COLUMNS = `
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

export const findAllUsersQuery = async (pagination: PaginationQuery) => {
	const totalResult = await query<{ count: number }>(`
        SELECT COUNT(*)::int AS count
        FROM users
    `);

	const total = totalResult.rows[0].count;

	const result = await query<PublicUser>(
		`
        SELECT
			${PUBLIC_USER_COLUMNS}
        FROM users
        ORDER BY created_at DESC
        LIMIT $1
        OFFSET $2
    `,
		[pagination.limit, pagination.offset],
	);

	return paginationResult(result.rows, total, pagination);
};

export const createUserQuery = async (payload: CreateUserPayload) => {
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
			RETURNING ${PUBLIC_USER_COLUMNS}`,
		[normalizedEmail, password, username, firstname, lastname, avatar, role, account_status, signed_to_newsletter],
	);

	return result.rows[0];
};

export const findUserByIdQuery = async (userId: number) => {
	const result = await query<PublicUser>(
		`SELECT 
			${PUBLIC_USER_COLUMNS}
        FROM users 
		WHERE id = $1`,
		[userId],
	);

	return result.rows[0] ?? null;
};

export const updateUserByIdQuery = async (userId: number, payload: UpdateUserPayload) => {
	const fields = UPDATE_USER_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [userId, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<PublicUser>(
		`
			UPDATE users 
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE id = $1 
			RETURNING ${PUBLIC_USER_COLUMNS}`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteUserByIdQuery = async (userId: number) => {
	const result = await query("DELETE FROM users WHERE id = $1", [userId]);

	return result.rowCount === 1;
};
