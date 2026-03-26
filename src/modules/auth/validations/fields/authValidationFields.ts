import { body } from "express-validator";

export const emailField = () =>
	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email must be valid");
