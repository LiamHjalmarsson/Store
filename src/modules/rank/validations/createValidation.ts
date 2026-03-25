import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { rankNameUnique } from "./rules/rankNameUnique.js";

export const createValidation = validateRequest([
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be 2-100")
		.custom(rankNameUnique),

	body("min_xp")
		.notEmpty()
		.withMessage("min_xp is required")
		.isInt({ min: 0 })
		.withMessage("min_xp must be 0 or higher")
		.toInt(),

	body("badge_url").optional({ nullable: true }).isURL().withMessage("badge_url must be a valid URL"),
]);
