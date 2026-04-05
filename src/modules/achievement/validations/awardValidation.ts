import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { userExistsById } from "./rules/userExistsById.js";

const AWARD_FIELDS = ["user_id", "achievement_id"] as const;

export const awardValidation = validateRequest([
	body().custom(onlyAllowedFields(AWARD_FIELDS)).bail(),

	body("user_id")
		.notEmpty()
		.withMessage("user_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid user ID")
		.toInt()
		.bail()
		.custom(userExistsById),

	body("achievement_id")
		.notEmpty()
		.withMessage("achievement_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid achievement ID")
		.toInt()
		.bail()
		.custom(achievementExistsById),
]);

