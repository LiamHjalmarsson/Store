import { body } from "express-validator";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireAtLeastOneField } from "../../../shared/validations/utils/requireAtLeastOneFiled.js";
import { onlyAllowedFields } from "../../../shared/validations/utils/onlyAllowedFileds.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";

const allowedFields = ["website", "bio", "payout_method"] as const;

export const updateCreatorValidation = validateRequest([
	body().custom(requireAtLeastOneField).bail(),

	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body("website").optional({ nullable: true }).isURL().withMessage("Website must be valid URL"),

	body("bio").optional({ nullable: true }).isLength({ max: 500 }).withMessage("Bio max 500 characters"),

	body("payout_method")
		.optional({ nullable: true })
		.isIn(["stripe", "bank", "other"])
		.withMessage("Invalid payout method"),

	body("verified_creator")
		.custom(() => {
			throw new BadRequestError("verified_creator cannot be updated by creator");
		})
		.optional(),
]);
