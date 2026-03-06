import { query } from "../../../config/database.js";
import { User } from "../../../shared/types/user.js";
import { AuthUser, CreateUserPayload } from "../types/authType.js";

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

export const findUserWithPasswordByEmail = async (email: string) => {
	const result = await query<User>(
		`
		SELECT * 
		FROM users 
		WHERE email = $1`,
		[email],
	);

	return result.rows[0];
};

export const createNewUser = async (payload: CreateUserPayload) => {
	const { password, email, username } = payload;

	const result = await query<AuthUser>(
		`INSERT INTO users 
			(email, password, username) 
		VALUES 
			($1, $2, $3) 
		RETURNING ${authUserSelect}`,
		[email, password, username],
	);

	return result.rows[0];
};

export const findUserById = async (id: number) => {
	const result = await query<AuthUser>(
		`SELECT 
			${authUserSelect}
		FROM users 
		WHERE id = $1`,
		[id],
	);

	return result.rows[0];
};
