import { body } from "express-validator";
import { achievementNameUnique } from "../rules/achievementNameUnique.js";

export const nameField = () =>
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name of achievement is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Name must be between 3 and 100 characters")
		.custom(achievementNameUnique);

export const codeField = () =>
	body("code")
		.trim()
		.notEmpty()
		.withMessage("Achievement code is required")
		.isLength({ min: 3, max: 20 })
		.withMessage("Code must be between 3 and 20 characters");

export const xpRewardField = () =>
	body("xp_reward")
		.notEmpty()
		.withMessage("XP reward is required")
		.isInt({ min: 1 })
		.withMessage("XP reward must be a positive integer")
		.toInt();

export const iconField = () => body("icon").optional().isURL().withMessage("Icon must be a valid URL");

export const descriptionField = () => body("description").optional().notEmpty().withMessage("Description");
