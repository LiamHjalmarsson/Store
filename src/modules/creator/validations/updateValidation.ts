import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/fields/requireAtLeastOneField.js";
import { onlyAllowedFields } from "../../../shared/validations/fields/onlyAllowedFields.js";

const allowedFields = ["website", "bio", "stripe_account_id", "payout_method"] as const;

export const updateCreatorValidation = validateRequest([
	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("website").optional({ nullable: true }).isURL().withMessage("Website must be valid URL"),

	body("bio").optional({ nullable: true }).isLength({ max: 500 }).withMessage("Bio max 500 characters"),

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
