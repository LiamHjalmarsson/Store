import { body } from "express-validator";
import { achievementCodeUnique } from "../rules/achievementCodeUnique.js";
import { achievementNameUnique } from "../rules/achievementNameUnique.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";

export function nameField() {
	return body("name")
		.trim()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Name"))
		.isLength({ min: 3, max: 100 })
		.withMessage("Name must be between 3 and 100 characters")
		.custom(achievementNameUnique);
}

export function codeField() {
	return body("code")
		.trim()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Code"))
		.isLength({ min: 3, max: 20 })
		.withMessage("Code must be between 3 and 20 characters")
		.custom(achievementCodeUnique);
}

export function xpRewardField() {
	return body("xp_reward")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("XP"))
		.isInt({ min: 1 })
		.withMessage("XP reward must be a positive integer")
		.toInt();
}

export function iconField() {
	return body("icon").optional({ nullable: true }).isURL().withMessage("Icon must be a valid URL");
}

export function descriptionField() {
	return body("description")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 1000 })
		.withMessage("Description can be up to 1000 characters");
}
