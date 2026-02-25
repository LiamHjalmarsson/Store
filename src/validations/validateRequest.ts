import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { BadRequestError } from "../shared/errors/BadRequest.js";

export function validateRequest(req: Request, res: Response, next: NextFunction) {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const errorMessages = errors.array().map((error) => error.msg);

		throw new BadRequestError(errorMessages, 400);
	}

	next();
}
