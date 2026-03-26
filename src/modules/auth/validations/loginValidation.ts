import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { emailField } from "./fields/authValidationFields.js";

const allowedFields = ["email", "password"] as const;

export const loginValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	emailField(),

	body("password").notEmpty().withMessage("Password is required"),
]);
