import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { RANK_FIELDS, badgeUrlField, minXpField, nameField } from "./fields/validationFields.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(RANK_FIELDS)).bail(),

	nameField(),

	minXpField(),

	badgeUrlField(),
]);
