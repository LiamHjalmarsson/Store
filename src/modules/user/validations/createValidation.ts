import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import {
	CREATE_USER_FIELDS,
	accountStatusField,
	avatarField,
	createUsernameField,
	emailField,
	firstnameField,
	lastnameField,
	passwordField,
	roleField,
	signedToNewsletterField,
} from "./fields/validationFields.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(CREATE_USER_FIELDS)).bail(),

	emailField(),

	passwordField(),

	createUsernameField(),

	firstnameField(),

	lastnameField(),

	avatarField(),

	roleField(),

	accountStatusField(),

	signedToNewsletterField(),
]);
