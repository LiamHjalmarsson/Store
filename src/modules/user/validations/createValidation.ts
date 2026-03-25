import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import emailUnique from "../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../shared/validations/rules/usernameUnique.js";

const allowedFields = [
	"email",
	"password",
	"username",
	"firstname",
	"lastname",
	"avatar",
	"role",
	"account_status",
	"signed_to_newsletter",
] as const;

export const createValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)),

	body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("A valid email is required")
		.custom(emailUnique),

	body("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 6 })
		.withMessage("password must be at least 6 characters"),

	body("username")
		.trim()
		.notEmpty()
		.withMessage("username is required")
		.isLength({ min: 3, max: 30 })
		.withMessage("username must be 3-30 characters")
		.custom(usernameUnique),

	body("firstname").optional({ nullable: true }).trim().isLength({ max: 80 }).withMessage("firstname max 80"),

	body("lastname").optional({ nullable: true }).trim().isLength({ max: 80 }).withMessage("lastname max 80"),

	body("avatar").optional({ nullable: true }).isURL().withMessage("avatar must be a valid URL"),

	body("role").optional().isIn(["user", "admin", "creator"]).withMessage("role must be user, admin or creator"),

	body("account_status")
		.optional()
		.isIn(["active", "suspended", "banned"])
		.withMessage("account_status must be active, suspended or banned"),

	body("signed_to_newsletter").optional().isBoolean().withMessage("signed_to_newsletter must be true/false"),
]);

