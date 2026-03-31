import { body } from "express-validator";
import emailUnique from "../../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../../shared/validations/rules/usernameUnique.js";

export const LOGIN_FIELDS = ["email", "password"] as const;

export const REGISTER_FIELDS = ["email", "password", "username"] as const;

export function emailField() {
	return body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email must be valid");
}

export function uniqueEmailField() {
	return emailField().custom(emailUnique);
}

export function loginPasswordField() {
	return body("password").notEmpty().withMessage("Password is required");
}

export function registerPasswordField() {
	return body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long");
}

export function usernameField() {
	return body("username")
		.trim()
		.notEmpty()
		.withMessage("Username is required")
		.isLength({ min: 3, max: 30 })
		.withMessage("Username must be between 3 and 30 characters")
		.custom(usernameUnique);
}

