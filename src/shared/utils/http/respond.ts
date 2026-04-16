import type { Response } from "express";

export type ApiSuccessResponse<T> = {
	status: "success";
	message: string;
	data: T;
};

export type ApiResponse<T> = Response<ApiSuccessResponse<T>>;

export type ApiErrorResponse = {
	status: "error";
	message: string;
	error: {
		statusCode: number;
		errors: string[];
	};
};

export const sendSuccess = <T>(res: ApiResponse<T>, message: string, data: T, statusCode = 200): ApiResponse<T> => {
	return res.status(statusCode).json({
		status: "success",
		message,
		data,
	});
};

export const sendError = (
	res: Response<ApiErrorResponse>,
	message: string,
	errors: string[] = [],
	statusCode = 400,
): Response<ApiErrorResponse> => {
	return res.status(statusCode).json({
		status: "error",
		message,
		error: {
			statusCode,
			errors,
		},
	});
};
