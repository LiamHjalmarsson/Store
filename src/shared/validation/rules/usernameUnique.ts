import { query } from "../../../config/database.js";
import { BadRequestError } from "../../errors/badRequest.js";

const usernameUnique = async (username: string) => {
	const result = await query(`SELECT 1 FROM users WHERE username = $1`, [username]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Username is already used");
	}

	return true;
};

export default usernameUnique;
