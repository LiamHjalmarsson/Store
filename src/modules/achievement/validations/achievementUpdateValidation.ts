import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";

import { achievementNameUnique } from "./rules/achievementNameUnique.js";

export const updateAchievementValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid achievement ID").bail(),

	body("name")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Name of achievement is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Name must be between 3 and 100 characters")
		.custom(achievementNameUnique),

	body("code")
		.optional()
		.trim()
		.notEmpty()
		.withMessage("Achievement code is required")
		.isLength({ min: 3, max: 20 })
		.withMessage("Code must be between 3 and 20 characters"),

	body("xp_reward")
		.optional()
		.notEmpty()
		.withMessage("XP reward is required")
		.isInt({ min: 1 })
		.withMessage("XP reward must be a positive integer")
		.toInt(),

	body("icon").optional().isURL().withMessage("Icon must be a valid URL"),

	body("description").optional().notEmpty().withMessage("Description"),
]);
