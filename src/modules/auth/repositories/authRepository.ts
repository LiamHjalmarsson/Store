import { query } from "../../../config/database.js";
import { AuthUser, AuthUserWithPassword, CreateUserPayload } from "../types/auth.js";

const authUserSelect = `
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

export const findUserWithPasswordByEmailQuery = async (email: string) => {
	const result = await query<AuthUserWithPassword>(
		`
			SELECT 
				${authUserSelect},
				password
			FROM users 
			WHERE LOWER(email) = LOWER($1)
		`,
		[email],
	);

	return result.rows[0] ?? null;
};

export const createUserQuery = async (payload: CreateUserPayload) => {
	const { password, email, username } = payload;

	const result = await query<AuthUser>(
		`
			INSERT INTO users 
				(email, password, username) 
			VALUES 
				($1, $2, $3) 
			RETURNING 
				${authUserSelect}
		`,
		[email, password, username],
	);

	return result.rows[0];
};

export const findUserByIdQuery = async (id: number) => {
	const result = await query<AuthUser>(
		`
			SELECT 
				${authUserSelect}
			FROM users 
			WHERE id = $1
		`,
		[id],
	);

	return result.rows[0];
};

export const updateUserLastLoginQuery = async (id: number) => {
	await query(
		`
			UPDATE users
			SET last_login = CURRENT_TIMESTAMP
			WHERE id = $1
		`,
		[id],
	);
};
