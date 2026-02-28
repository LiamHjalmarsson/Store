import { body } from "express-validator";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";

export const becomeCreatorValidation = validateRequest([
	body("website").optional().trim().isURL().withMessage("Website must be a valid URL"),

	body("bio").optional().trim().isLength({ max: 500 }).withMessage("Bio can be up to 500 characters"),

	body("payout_method")
		.optional()
		.isIn(["stripe", "bank", "other"])
		.withMessage("Payout method must be one of: stripe, bank, other"),
]);
