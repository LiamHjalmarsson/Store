import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { codeField, descriptionField, iconField, nameField, xpRewardField } from "./fields/validationFields.js";
import { UPDATE_ACHIEVEMENT_FIELDS } from "../constants/achievementFields.js";
import { ACHIEVEMENT_MESSAGES } from "../constants/achievementMessages.js";

export const updateValidation = validateRequest([
	param("id")
		.isInt({ min: 1 })
		.withMessage(ACHIEVEMENT_MESSAGES.INVALID_ID)
		.bail()
		.custom(achievementExistsById)
		.bail(),

	body().custom(onlyAllowedFields(UPDATE_ACHIEVEMENT_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	nameField().optional(),

	codeField().optional(),

	xpRewardField().optional(),

	iconField().optional(),

	descriptionField().optional(),
]);
