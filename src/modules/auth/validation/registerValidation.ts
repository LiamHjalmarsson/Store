import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFields.js";
import emailUnique from "../../../shared/validation/rules/emailUnique.js";
import usernameUnique from "../../../shared/validation/rules/usernameUnique.js";

const allowedFields = ["email", "password", "username"] as const;

export const registerValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

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
		.trim()
		.notEmpty()
		.withMessage("Username is required ")
		.isLength({ min: 3, max: 30 })
		.withMessage("Username must be 3-30 characters")
		.custom(usernameUnique),
]);

