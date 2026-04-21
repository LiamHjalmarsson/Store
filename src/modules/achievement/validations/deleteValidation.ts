import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";
import { VALIDATION_MESSAGES } from "../../../shared/constants/validationMessages.js";

export const deleteValidation = validateRequest([
	param("id")
		.isInt({ min: 1 })
		.withMessage(VALIDATION_MESSAGES.INVALID_ID("achievement"))
		.bail()
		.custom(achievementExistsById)
		.bail(),
]);
