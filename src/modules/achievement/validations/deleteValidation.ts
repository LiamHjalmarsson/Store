import { param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { achievementExistsById } from "./rules/achievementExistsById.js";

export const deleteValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid achievement ID").bail().custom(achievementExistsById).bail(),
]);
