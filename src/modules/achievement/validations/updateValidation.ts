import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { codeField, descriptionField, iconField, nameField, xpRewardField } from "./fields/validationFields.js";
import { ACHIEVEMENT_FIELDS } from "../constants/achievementFields.js";

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid achievement ID").bail().custom(achievementExistsById).bail(),

	body().custom(onlyAllowedFields(ACHIEVEMENT_FIELDS)).bail(),

	body().custom(requireAtLeastOneField).bail(),

	nameField().optional(),

	codeField().optional(),

	xpRewardField().optional(),

	iconField().optional(),

	descriptionField().optional(),
]);
