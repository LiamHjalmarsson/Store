import { body, CustomValidator } from "express-validator";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { query } from "../../../config/database.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { onlyAllowedFields } from "../../../shared/validation/utils/onlyAllowedFields.js";

const allowedFields = ["website", "bio", "stripe_account_id", "payout_method"] as const;

const notAlreadyCreator: CustomValidator = async (_, { req }) => {
	const userId = (req as AuthenticatedRequest).user?.id;

	if (!userId) {
		throw new BadRequestError("Authentication required");
	}

	const result = await query(`SELECT 1 FROM creators WHERE user_id = $1`, [userId]);

	if (result.rowCount !== null && result.rowCount > 0) {
		throw new BadRequestError("You are already a creator");
	}

	return true;
};

export const becomeCreatorValidation = validateRequest([
	body().custom(onlyAllowedFields(allowedFields)).bail(),

	body().custom(notAlreadyCreator).bail(),

	body("website").optional({ nullable: true }).isURL().withMessage("Website must be a valid URL"),

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
