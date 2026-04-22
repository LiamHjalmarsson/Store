export const SUCCESS_MESSAGES = {
	REQUEST_COMPLETED: "Request completed successfully",
	CREATED: (resource?: string) => (resource ? `${resource} created successfully` : "Resource created successfully"),
	RETRIEVED: (resource?: string) =>
		resource ? `${resource} retrieved successfully` : "Resource retrieved successfully",
	RETRIEVED_ALL: (resource?: string) =>
		resource ? `${resource} retrieved successfully` : "Resources retrieved successfully",
	UPDATED: (resource?: string) => (resource ? `${resource} updated successfully` : "Resource updated successfully"),
	DELETED: (resource?: string) => (resource ? `${resource} deleted successfully` : "Resource deleted successfully"),
} as const;
