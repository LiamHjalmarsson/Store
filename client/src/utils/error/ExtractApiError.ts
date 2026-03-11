import axios from "axios";
import type { ApiError } from "@/types/api";

export function extractApiError(error: unknown): ApiError {
	if (axios.isAxiosError<ApiError>(error) && error.response?.data) {
		return error.response.data;
	}

	return {
		status: "error",
		message: "Unexpected error",
		error: {
			statusCode: 500,
			errors: ["Unexpected error"],
		},
	};
}
