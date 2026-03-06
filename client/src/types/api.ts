export type APIResponse<T> = {
	success: boolean;
	content: T;
	status?: number;
};

export interface ApiError {
	error: string;
	errors: string[];
}
