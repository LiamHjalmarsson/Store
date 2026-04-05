import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { registerPasswordField, uniqueEmailField, usernameField } from "./fields/validationFields.js";
import { REGISTER_FIELDS } from "../constants/authFields.js";

export const registerValidation = validateRequest([
	body().custom(onlyAllowedFields(REGISTER_FIELDS)).bail(),

	uniqueEmailField(),

	registerPasswordField(),

	usernameField(),
]);
