import { CustomValidator } from "express-validator";
import { BadRequestError } from "../errors/badRequest.js";

export const onlyAllowedFields = (allowed: readonly string[]): CustomValidator => {
	return async (_, { req }) => {
		const body = req.body || {};

		const sentKeys = Object.keys(body);

		const invalidKeys = sentKeys.filter((key) => !allowed.includes(key));

		if (invalidKeys.length > 0) {
			throw new BadRequestError(`Invalid fields: ${invalidKeys.join(", ")}`);
		}

		return true;
	};
};
