import { body, param } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";
import { creatorExistsById } from "./rules/creatorExistsById.js";

const allowedFields = ["website", "bio", "verified_creator", "featured", "stripe_account_id", "payout_method"] as const;

export const adminUpdateCreatorValidation = validateRequest([
	param("id").isInt({ min: 1 }).withMessage("Invalid creator ID").bail().custom(creatorExistsById).bail(),

	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("website").optional({ nullable: true }).isURL().withMessage("Website must be a valid URL"),

	body("bio").optional({ nullable: true }).isLength({ max: 500 }).withMessage("Bio max 500 characters"),

	body("verified_creator").optional().isBoolean().withMessage("verified_creator must be true or false"),

	body("featured").optional().isBoolean().withMessage("featured must be true or false"),

	body("stripe_account_id")
		.optional({ nullable: true })
		.isString()
		.withMessage("stripe_account_id must be a string")
		.isLength({ max: 100 })
		.withMessage("stripe_account_id must be at most 100 characters"),

	body("payout_method")
		.optional({ nullable: true })
		.isIn(["stripe", "bank", "other"])
		.withMessage("Invalid payout method"),
]);
