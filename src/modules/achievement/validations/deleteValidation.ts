import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { ACHIEVEMENT_MESSAGES } from "../constants/achievementMessages.js";

export const deleteValidation = validateRequest([
	param("id")
		.isInt({ min: 1 })
		.withMessage(ACHIEVEMENT_MESSAGES.INVALID_ID)
		.bail()
		.custom(achievementExistsById)
		.bail(),
]);
