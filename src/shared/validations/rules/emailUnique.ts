import { query } from "../../../config/database.js";
import { BadRequestError } from "../../errors/badRequest.js";

const emailUnique = async (email: string) => {
	const normalized = String(email).trim().toLowerCase();

	const result = await query(`SELECT 1 FROM users WHERE email = $1`, [normalized]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("E-postadressen används redan");
	}

	return true;
};

export default emailUnique;
