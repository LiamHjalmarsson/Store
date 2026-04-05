import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { emailField, loginPasswordField } from "./fields/validationFields.js";
import { LOGIN_FIELDS } from "../constants/authFields.js";

export const loginValidation = validateRequest([
	body().custom(onlyAllowedFields(LOGIN_FIELDS)).bail(),

	emailField(),

	loginPasswordField(),
]);
