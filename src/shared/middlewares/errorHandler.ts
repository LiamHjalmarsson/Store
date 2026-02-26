import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			error: err.message,
			errors: err.errors || [err.message],
		});
	}

	res.status(500).json({
		error: "Internal server error",
		errors: ["Something went wrong on the server"],
	});
};
