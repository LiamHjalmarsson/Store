import { query } from "../../../config/database.js";
import { BadRequestError } from "../../errors/badRequest.js";

const emailUnique = async (email: string) => {
	const result = await query(`SELECT 1 FROM users WHERE email = $1`, [email]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Email is already used");
	}

	return true;
};

export default emailUnique;
