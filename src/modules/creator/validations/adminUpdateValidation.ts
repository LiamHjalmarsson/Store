import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { creatorExistsById } from "./rules/creatorExistsById.js";
import {
	ADMIN_CREATOR_FIELDS,
	bioField,
	featuredField,
	payoutMethodField,
	stripeAccountIdField,
	verifiedCreatorField,
	websiteField,
} from "./fields/validationFields.js";

export const adminUpdateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid creator ID").bail().custom(creatorExistsById).bail(),

	body().custom(onlyAllowedFields(ADMIN_CREATOR_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	websiteField(),

	bioField(),

	verifiedCreatorField(),

	featuredField(),

	stripeAccountIdField(),

	payoutMethodField(),
]);
