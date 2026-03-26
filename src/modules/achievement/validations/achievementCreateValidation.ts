import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import {
	codeField,
	descriptionField,
	iconField,
	nameField,
	xpRewardField,
} from "./fields/achievementValidationFields.js";

export const createAchievementValidation = validateRequest([
	nameField(),
	codeField(),
	xpRewardField(),
	iconField(),
	descriptionField(),
]);
