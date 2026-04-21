export const ERROR_MESSAGES = {
	AUTHENTICATION_REQUIRED: "Authentication required",
	UNAUTHORIZED: "Unauthorized",
	FORBIDDEN: "Forbidden",
	SERVER_ERROR: "Internal server error",
	NOT_FOUND: (resource?: string) => (resource ? `${resource} not found` : "Not found"),
} as const;
