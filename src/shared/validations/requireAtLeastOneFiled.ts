import { CustomValidator } from "express-validator";
import { BadRequestError } from "../errors/badRequest.js";

export const requireAtLeastOneField: CustomValidator = async (_, { req }) => {
	const bodyObj = req.body || {};

	if (Object.keys(bodyObj).length === 0) {
		throw new BadRequestError("At least one field must be provided to update");
	}

	return true;
};
