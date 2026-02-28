import { body } from "express-validator";
import { query } from "../../config/database.js";
import { BadRequestError } from "../../shared/errors/badRequest.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";

const achievementNameExists = async (achievement: string) => {
	const result = await query(`SELECT 1 FROM achievements WHERE name = $1`, [achievement]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("Achievement already exists");
	}

	return true;
};

export const createValidation = validateRequest([
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name of achievement is required")
		.isLength({ min: 3, max: 100 })
		.withMessage("Name must be between 3 and 100 characters")
		.custom(achievementNameExists),

	body("code")
		.trim()
		.notEmpty()
		.withMessage("Achievement code is required")
		.isLength({ min: 3, max: 20 })
		.withMessage("Code must be between 3 and 20 characters"),

	body("xp_reward")
		.notEmpty()
		.withMessage("XP reward is required")
		.isInt({ min: 1 })
		.withMessage("XP reward must be a positive integer")
		.toInt(),

	body("icon").optional().isURL().withMessage("Icon must be a valid URL"),
]);
