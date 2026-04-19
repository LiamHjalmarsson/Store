import { Meta } from "express-validator";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const discountConsistencyRule = async (_: unknown, { req }: Meta) => {
	const isDiscounted = req.body?.is_discounted;

	const discounted = req.body?.discounted;

	if (isDiscounted === true) {
		const value = Number(discounted);

		if (Number.isNaN(value) || value <= 0) {
			throw new BadRequestError("discounted must be more than 0 when discounted is true");
		}
	}

	if (isDiscounted === false && discounted !== undefined) {
		const value = Number(discounted);

		if (!Number.isNaN(value) && value !== 0) {
			throw new BadRequestError("discounted must be 0 when is_discounted is false");
		}
	}

	return true;
};
