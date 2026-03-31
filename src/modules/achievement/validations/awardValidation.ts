import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";

const AWARD_FIELDS = ["achievement_id"] as const;

export const awardValidation = validateRequest([
	body().custom(onlyAllowedFields(AWARD_FIELDS)).bail(),

	body("achievement_id")
		.notEmpty()
		.withMessage("achievement_id is required")
		.isInt({ min: 1 })
		.withMessage("Invalid achievement ID")
		.toInt()
		.bail()
		.custom(achievementExistsById),
]);

