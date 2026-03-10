export type APIResponse<T> = {
	success: "success";
	message: string;
	data: T;
};

export interface ApiError {
	status: "error";
	message: string;
	error: {
		statusCode: number;
		errors: string[];
	};
}
