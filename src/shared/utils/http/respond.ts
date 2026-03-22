import type { Response } from "express";

export const sendSuccess = <T>(res: Response, message: string, data: T, statusCode = 200) => {
	return res.status(statusCode).json({
		status: "success",
		message,
		data,
	});
};

export const sendError = (res: Response, message: string, errors: string[] = [], statusCode = 400) => {
	return res.status(statusCode).json({
		status: "error",
		message,
		error: {
			statusCode,
			errors,
		},
	});
};
