import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import {
	CREATOR_FIELDS,
	bioField,
	payoutMethodField,
	stripeAccountIdField,
	websiteField,
} from "./fields/validationFields.js";
import { notAlreadyCreator } from "./rules/notAlreadyCreator.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(CREATOR_FIELDS)).bail(),

	body().custom(notAlreadyCreator).bail(),

	websiteField(),

	bioField(),

	stripeAccountIdField(),

	payoutMethodField(),
]);
