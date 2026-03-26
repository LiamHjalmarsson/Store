import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import emailUnique from "../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../shared/validations/rules/usernameUnique.js";
import { emailField } from "./fields/authValidationFields.js";

const allowedFields = ["email", "password", "username"] as const;

export const registerValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	emailField().custom(emailUnique),

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
