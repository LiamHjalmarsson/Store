import { query } from "../../config/database.js";
import { User } from "../../types/user.js";

export async function findUserWithPasswordByEmail(email: string): Promise<User | null> {
	const result = await query<User>("SELECT * FROM users WHERE email = $1", [email]);

	return result.rows[0];
}
