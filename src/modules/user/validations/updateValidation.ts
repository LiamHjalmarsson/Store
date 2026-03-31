import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { userExistsById } from "./rules/userExistsById.js";
import {
	UPDATE_USER_FIELDS,
	avatarField,
	firstnameField,
	lastnameField,
	roleField,
	signedToNewsletterField,
	updateAccountStatusField,
	updateUsernameField,
} from "./fields/validationFields.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid user ID").bail().custom(userExistsById).bail(),

	body().custom(onlyAllowedFields(UPDATE_USER_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	firstnameField(),

	lastnameField(),

	avatarField(),

	updateUsernameField(),

	signedToNewsletterField(),

	updateAccountStatusField(),

	roleField().withMessage("role must be one of: user, admin, creator"),
]);
