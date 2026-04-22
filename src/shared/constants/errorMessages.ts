export const ERROR_MESSAGES = {
	AUTHENTICATION_REQUIRED: "Authentication required",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	SERVER_ERROR: "Internal server error",
	INVALID_ID: "Invalid ID",

	NOT_FOUND: (resource?: string) => (resource ? `${resource} not found` : "Not found"),
} as const;
