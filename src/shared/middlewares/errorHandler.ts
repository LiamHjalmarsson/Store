import type { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/customError.js";
import { sendError } from "../utils/http/respond.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	const message = err.message || "Internal server error";

	if (err instanceof CustomError) {
		return sendError(res, message, err.errors, err.statusCode);
	}

	return sendError(res, message, ["Something went wrong on the server"], 500);
};

