import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import emailUnique from "../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../shared/validations/rules/usernameUnique.js";

const allowedFields = ["email", "password", "username"] as const;

export const registerValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("E-post är obligatorisk")
		.isEmail()
		.withMessage("E-postadressen måste vara giltig")
		.custom(emailUnique),

	body("password")
		.notEmpty()
		.withMessage("Lösenord är obligatoriskt")
		.isLength({ min: 6 })
		.withMessage("Lösenordet måste vara minst 6 tecken långt"),

	body("username")
		.trim()
		.notEmpty()
		.withMessage("Användarnamn är obligatoriskt")
		.isLength({ min: 3, max: 30 })
		.withMessage("Användarnamn måste vara mellan 3 och 30 tecken")
		.custom(usernameUnique),
]);
