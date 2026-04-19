import { body } from "express-validator";
import { usernameUnique } from "../rules/usernameUnique.js";

export function firstnameField() {
	return body("firstname")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 80 })
		.withMessage("firstname max 80 characters");
}

export function lastnameField() {
	return body("lastname")
		.optional({ nullable: true })
		.trim()
		.isLength({ max: 80 })
		.withMessage("lastname max 80 characters");
}

export function avatarField() {
	return body("avatar").optional({ nullable: true }).isURL().withMessage("avatar must be a valid URL");
}

export function usernameField() {
	return body("username")
		.optional({ nullable: true })
		.trim()
		.isLength({ min: 3, max: 30 })
		.withMessage("username must be 3-30 characters")
		.custom(usernameUnique);
}

export function signedToNewsletterField() {
	return body("signed_to_newsletter").optional().isBoolean().withMessage("signed_to_newsletter must be true/false");
}
