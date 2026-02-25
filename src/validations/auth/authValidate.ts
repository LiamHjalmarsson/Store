import { body } from "express-validator";
import { query } from "../../config/database.js";
import { BadRequestError } from "../../shared/errors/BadRequest.js";

const emailNotUsed = async (email: string) => {
	const result = await query(`SELECT 1 FROM users WHERE email = $1`, [email]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Email already used");
	}

	return true;
};

const usernameNotUsed = async (username: string) => {
	const result = await query(`SELECT 1 FROM users WHERE username = $1`, [username]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Username already used");
	}

	return true;
};

export const loginValidation = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
];

export const registerValidation = [
	body("email").isEmail().withMessage("A valid email is required").custom(emailNotUsed),
	body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
	body("username")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters")
		.custom(usernameNotUsed),
];
