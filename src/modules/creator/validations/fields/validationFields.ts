import { body } from "express-validator";

export const CREATOR_FIELDS = ["website", "bio", "stripe_account_id", "payout_method"] as const;

export const ADMIN_CREATOR_FIELDS = [
	"website",
	"bio",
	"verified_creator",
	"featured",
	"stripe_account_id",
	"payout_method",
] as const;

export function websiteField() {
	return body("website").optional({ nullable: true }).isURL().withMessage("Website must be a valid URL");
}

export function bioField() {
	return body("bio").optional({ nullable: true }).isLength({ max: 500 }).withMessage("Bio max 500 characters");
}

export function stripeAccountIdField() {
	return body("stripe_account_id")
		.optional({ nullable: true })
		.isString()
		.withMessage("stripe_account_id must be a string")
		.isLength({ max: 100 })
		.withMessage("stripe_account_id must be at most 100 characters");
}

export function payoutMethodField() {
	return body("payout_method")
		.optional({ nullable: true })
		.isIn(["stripe", "bank", "other"])
		.withMessage("Invalid payout method");
}

export function verifiedCreatorField() {
	return body("verified_creator").optional().isBoolean().withMessage("verified_creator must be true or false");
}

export function featuredField() {
	return body("featured").optional().isBoolean().withMessage("featured must be true or false");
}

