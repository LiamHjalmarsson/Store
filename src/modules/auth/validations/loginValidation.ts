import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";

const LOGIN_FIELDS = ["email", "password"] as const;

export const validateLoginRequest = validateRequest([
	body().custom(onlyAllowedFields(LOGIN_FIELDS)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email must be valid"),

	body("password").notEmpty().withMessage("Password is required"),
]);
