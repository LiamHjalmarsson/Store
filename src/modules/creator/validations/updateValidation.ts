import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import {
	CREATOR_FIELDS,
	bioField,
	payoutMethodField,
	stripeAccountIdField,
	websiteField,
} from "./fields/validationFields.js";

export const updateValidation = validateRequest([
	body().custom(onlyAllowedFields(CREATOR_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	websiteField(),

	bioField(),

	stripeAccountIdField(),

	payoutMethodField(),
]);
