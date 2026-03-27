import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";

const allowedFields = ["email", "password"] as const;

export const loginValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("E-post är obligatorisk")
		.isEmail()
		.withMessage("E-postadressen måste vara giltig"),

	body("password").notEmpty().withMessage("Lösenord är obligatoriskt"),
]);
