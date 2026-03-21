import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { codeField, descriptionField, iconField, nameField, xpRewardField } from "./fields/validationFields.js";

export const updateAchievementValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid achievement ID").bail(),

	nameField().optional(),

	codeField().optional(),

	xpRewardField().optional(),

	iconField().optional(),

	descriptionField().optional(),
]);
