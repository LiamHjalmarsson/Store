import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import emailUnique from "../../../shared/validation/common/emailUnique.js";
import usernameUnique from "../../../shared/validation/common/usernameUnique.js";

export const registerValidation = validateRequest([
	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("A valid email is required")
		.custom(emailUnique),

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
		.custom(usernameUnique),
]);
