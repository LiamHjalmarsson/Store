import { body } from "express-validator";
import emailUnique from "../../../../shared/validations/rules/emailUnique.js";
import usernameUnique from "../../../../shared/validations/rules/usernameUnique.js";
import { usernameUnique as updateUsernameUnique } from "../rules/usernameUnique.js";

export const CREATE_USER_FIELDS = [
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

export const UPDATE_USER_FIELDS = [
	"firstname",
	"lastname",
	"avatar",
	"username",
	"role",
	"account_status",
	"signed_to_newsletter",
] as const;

export function emailField() {
	return body("email")
		.trim()
		.toLowerCase()
		.notEmpty()
		.withMessage("email is required")
		.isEmail()
		.withMessage("A valid email is required")
		.custom(emailUnique);
}

export function passwordField() {
	return body("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 6 })
		.withMessage("password must be at least 6 characters");
}

export function createUsernameField() {
	return body("username")
		.trim()
		.notEmpty()
		.withMessage("username is required")
		.isLength({ min: 3, max: 30 })
		.withMessage("username must be 3-30 characters")
		.custom(usernameUnique);
}

export function updateUsernameField() {
	return body("username")
		.optional()
		.trim()
		.isLength({ min: 3, max: 30 })
		.withMessage("username must be 3-30 characters")
		.custom(updateUsernameUnique);
}

export function firstnameField() {
	return body("firstname").optional({ nullable: true }).trim().isLength({ max: 80 }).withMessage("firstname max 80");
}

export function lastnameField() {
	return body("lastname").optional({ nullable: true }).trim().isLength({ max: 80 }).withMessage("lastname max 80");
}

export function avatarField() {
	return body("avatar").optional({ nullable: true }).isURL().withMessage("avatar must be a valid URL");
}

export function roleField() {
	return body("role").optional().isIn(["user", "admin", "creator"]).withMessage("role must be user, admin or creator");
}

export function accountStatusField() {
	return body("account_status")
		.optional()
		.isIn(["active", "suspended", "banned"])
		.withMessage("account_status must be active, suspended or banned");
}

export function updateAccountStatusField() {
	return body("account_status")
		.optional()
		.isIn(["active", "suspended", "banned"])
		.withMessage("account_status must be one of: active, suspended, banned");
}

export function signedToNewsletterField() {
	return body("signed_to_newsletter").optional().isBoolean().withMessage("signed_to_newsletter must be true/false");
}
