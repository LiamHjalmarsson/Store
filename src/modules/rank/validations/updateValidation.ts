import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { rankNameUnique } from "./rules/rankNameUnique.js";
import { rankExistsById } from "./rules/rankExistsById.js";

const allowedFields = ["name", "min_xp", "badge_url"] as const;

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid rank ID").bail().custom(rankExistsById).bail(),

	body().custom(requireAtLeastOneField).bail(),
	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("name").optional().trim().notEmpty().withMessage("Name cannot be empty").custom(rankNameUnique),

	body("min_xp").optional().isInt({ min: 0 }).withMessage("min_xp must be 0 or higher").toInt(),

	body("badge_url").optional({ nullable: true }).isURL().withMessage("badge_url must be a valid URL"),
]);
