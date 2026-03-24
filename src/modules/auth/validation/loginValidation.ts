import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFields.js";

const allowedFields = ["email", "password"] as const;

export const loginValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email must be valid"),

	body("password").notEmpty().withMessage("Password is required"),
]);
