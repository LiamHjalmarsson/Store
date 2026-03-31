import { body } from "express-validator";
import {
	PROFILE_FIELDS,
	avatarField,
	firstnameField,
	lastnameField,
	signedToNewsletterField,
	usernameField,
} from "./fields/validationFields.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

export const updateValidation = validateRequest([
	body().custom(onlyAllowedFields(PROFILE_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	firstnameField(),

	lastnameField(),

	avatarField(),

	usernameField(),

	signedToNewsletterField(),
]);

