import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { userExistsById } from "./rules/userExistsById.js";
import { VALIDATION_MESSAGES } from "../../../shared/constants/validationMessages.js";

const AWARD_FIELDS = ["user_id", "achievement_id"] as const;

export const awardValidation = validateRequest([
	body().custom(onlyAllowedFields(AWARD_FIELDS)).bail(),

	body("user_id")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("User ID"))
		.isInt({ min: 1 })
		.withMessage(VALIDATION_MESSAGES.INVALID_ID("user"))
		.toInt()
		.bail()
		.custom(userExistsById),

	body("achievement_id")
		.notEmpty()
		.withMessage(VALIDATION_MESSAGES.REQUIRED("Achievement ID"))
		.isInt({ min: 1 })
		.withMessage(VALIDATION_MESSAGES.INVALID_ID("achievement"))
		.toInt()
		.bail()
		.custom(achievementExistsById),
]);
