import { body } from "express-validator";
import emailUnique from "../../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../../shared/validations/rules/usernameUnique.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";

export function emailField() {
	return body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Email"))
		.isEmail()
		.withMessage("Email must be valid");
}

export function uniqueEmailField() {
	return emailField().custom(emailUnique);
}

export function loginPasswordField() {
	return body("password").notEmpty().withMessage(VALIDATION_MESSAGES.REQUIRED("Password"));
}

export function registerPasswordField() {
	return body("password")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Password"))
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long");
}

export function usernameField() {
	return body("username")
		.trim()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Username"))
		.isLength({ min: 3, max: 30 })
		.withMessage("Username must be between 3 and 30 characters")
		.custom(usernameUnique);
}
