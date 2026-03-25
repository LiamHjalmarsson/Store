import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { userExistsById } from "./rules/userExistsById.js";
import { usernameUnique } from "./rules/usernameUnique.js";

const allowedFields = [
	"firstname",
	"lastname",
	"avatar",
	"username",
	"role",
	"account_status",
	"signed_to_newsletter",
] as const;

export const updateValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid user ID").bail().custom(userExistsById).bail(),

	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("firstname")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 80 })
		.withMessage("firstname max 80 characters"),

	body("lastname")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 80 })
		.withMessage("lastname max 80 characters"),

	body("avatar").optional({ nullable: true }).isURL().withMessage("avatar must be a valid URL"),

	body("username")
		.optional({ nullable: true })
		.trim()
		.isLength({ min: 3, max: 30 })
		.withMessage("username must be 3-30 characters")
		.custom(usernameUnique),

	body("signed_to_newsletter").optional().isBoolean().withMessage("signed_to_newsletter must be true/false"),

	body("account_status")
		.optional()
		.isIn(["active", "suspended", "banned"])
		.withMessage("account_status must be one of: active, suspended, banned"),

	body("role").optional().isIn(["user", "admin", "creator"]).withMessage("role must be one of: user, admin, creator"),
]);
