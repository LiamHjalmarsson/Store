import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { CATEGORY_MESSAGES } from "../constants/categoryMessages.js";
import { categoryExistsById } from "./rules/categoryExistsById.js";

export const deleteValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage(CATEGORY_MESSAGES.INVALID_ID).bail().custom(categoryExistsById).bail(),
]);
