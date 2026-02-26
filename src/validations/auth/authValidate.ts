import { body } from "express-validator";
import { query } from "../../config/database.js";
import { BadRequestError } from "../../shared/errors/badRequest.js";

const emailNotUsed = async (email: string) => {
	const result = await query(`SELECT 1 FROM users WHERE email = $1`, [email]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Email is already used");
	}

	return true;
};

const usernameNotUsed = async (username: string) => {
	const result = await query(`SELECT 1 FROM users WHERE username = $1`, [username]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Username is already used");
	}

	return true;
};

export const loginValidation = [
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be valid"),
	body("password").notEmpty().withMessage("Password is required"),
];

export const registerValidation = [
	body("email")
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("A valid email is required")
		.custom(emailNotUsed),
	body("password")
		.notEmpty()
		.withMessage("Password is required ")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters"),
	body("username")
		.notEmpty()
		.withMessage("Username is required ")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters")
		.custom(usernameNotUsed),
];
