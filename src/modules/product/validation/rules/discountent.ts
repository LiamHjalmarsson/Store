import { Request } from "express";
import { BadRequestError } from "../../../../shared/errors/badRequest.js";

export const discountConsistency = async (_: unknown, req: Request) => {
	const isDiscounted = req.body?.is_discounted;

	const discounted = req.body?.discounted;

	if (isDiscounted === true) {
		const value = Number(discounted);

		if (Number.isNaN(value) || value <= 0) {
			throw new BadRequestError("discounted must be > 0 when is_discounted is true");
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
