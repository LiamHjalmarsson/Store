import { query } from "../../../config/database.js";
import { PublicUser, User } from "../../../shared/types/user.js";
import { CreateUserPayload } from "../types/authType.js";

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

	const result = await query<PublicUser>(
		`INSERT INTO users 
			(email, password, username) 
		VALUES 
			($1, $2, $3) 
		RETURNING id, email, username, role, avatar `,
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
