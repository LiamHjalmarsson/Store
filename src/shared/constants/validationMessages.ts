export const VALIDATION_MESSAGES = {
	REQUIRED: (field: string) => `${field} is required`,
	INVALID_ID: (resource?: string) => (resource ? `Invalid ${resource} ID` : "Invalid ID"),
} as const;
