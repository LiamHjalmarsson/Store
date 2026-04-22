import { body } from "express-validator";
import { rankNameUnique } from "../rules/rankNameUnique.js";
import { VALIDATION_MESSAGES } from "../../../../shared/constants/validationMessages.js";

export function nameField() {
	return body("name")
		.trim()
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Name"))
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be 2-100")
		.custom(rankNameUnique);
}

export function minXpField() {
	return body("min_xp")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Min XP"))
		.isInt({ min: 0 })
		.withMessage("min_xp must be 0 or higher")
		.toInt();
}

export function badgeUrlField() {
	return body("badge_url").optional({ nullable: true }).isURL().withMessage("badge_url must be a valid URL");
}
