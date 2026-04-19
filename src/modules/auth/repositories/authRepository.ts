import { query } from "../../../config/database.js";
import { normalizeValueToLowerCase } from "../../../shared/utils/format/normalizeValueToLowerCase.js";
import { AuthUser, AuthUserCredentials, CreateAuthUserPayload } from "../types/auth.js";

const AUTH_USER_COLUMNS = `
	id,
	email,
	firstname,
	lastname,
	avatar,
	username,
	role,
	account_status,
	signed_to_newsletter
`;

export const findAuthUserCredentialsByEmailQuery = async (email: string) => {
	const normalizedEmail = normalizeValueToLowerCase(email);

	const result = await query<AuthUserCredentials>(
		`
			SELECT
				${AUTH_USER_COLUMNS},
				password
			FROM users
			WHERE email = $1
		`,
		[normalizedEmail],
	);

	return result.rows[0] ?? null;
};

export const createAuthUserQuery = async (payload: CreateAuthUserPayload) => {
	const { password, email, username } = payload;

	const normalizedEmail = normalizeValueToLowerCase(email);

	const result = await query<AuthUser>(
		`
			INSERT INTO users
				(email, password, username)
			VALUES
				($1, $2, $3)
			RETURNING
				${AUTH_USER_COLUMNS}
		`,
		[normalizedEmail, password, username],
	);

	return result.rows[0];
};

export const findAuthUserByIdQuery = async (userId: number) => {
	const result = await query<AuthUser>(
		`
			SELECT
				${AUTH_USER_COLUMNS}
			FROM users
			WHERE id = $1
		`,
		[userId],
	);

	return result.rows[0] ?? null;
};

export const updateUserLastLoginQuery = async (userId: number) => {
	await query(
		`
			UPDATE users
			SET last_login = CURRENT_TIMESTAMP
			WHERE id = $1
		`,
		[userId],
	);
};
