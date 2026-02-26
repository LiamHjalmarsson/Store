import { Request, Response, NextFunction } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { BadRequestError } from "../errors/badRequest.js";

export function validateRequest(validations: ValidationChain[]) {
	return [
		...validations,
		(req: Request, _: Response, next: NextFunction) => {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg);

				throw new BadRequestError(errorMessages);
			}

			next();
		},
	];
}
