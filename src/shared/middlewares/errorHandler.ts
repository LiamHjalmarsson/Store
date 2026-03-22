import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError.js";
import { sendError } from "../utils/http/respond.js";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
	const message = err.message || "Internal server error";

	if (err instanceof CustomError) {
		return sendError(res, message, err.errors, err.statusCode);
	}

	sendError(res, message, ["Something went wrong on the server"], 500);
};
