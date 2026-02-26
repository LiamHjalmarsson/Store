import { body } from "express-validator";
import emailNotUsed from "../../shared/validations/common/email.js";
import usernameNotUsed from "../../shared/validations/common/username.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";

export const registerValidation = validateRequest([
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
]);
