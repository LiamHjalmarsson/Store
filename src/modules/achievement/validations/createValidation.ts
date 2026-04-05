import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { codeField, descriptionField, iconField, nameField, xpRewardField } from "./fields/validationFields.js";
import { ACHIEVEMENT_FIELDS } from "../constants/achievementFields.js";

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(ACHIEVEMENT_FIELDS)).bail(),

	nameField(),

	codeField(),

	xpRewardField(),

	iconField(),

	descriptionField(),
]);
