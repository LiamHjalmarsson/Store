import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import emailUnique from "../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../shared/validations/rules/usernameUnique.js";

const REGISTER_FIELDS = ["email", "password", "username"] as const;

export const validateRegisterRequest = validateRequest([
	body().custom(onlyAllowedFields(REGISTER_FIELDS)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email must be valid")
		.custom(emailUnique),

	body("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),

	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username is required")
		.isLength({ min: 3, max: 30 })
		.withMessage("Username must be between 3 and 30 characters")
		.custom(usernameUnique),
]);
