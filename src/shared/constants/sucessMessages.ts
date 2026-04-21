export const SUCCESS_MESSAGES = {
	REQUEST_COMPLETED: "Request completed successfully",
	CREATED: (resource: string) => `${resource} created successfully`,
	RETRIEVED: (resource: string) => `${resource} retrieved successfully`,
	RETRIEVED_ALL: (resources: string) => `${resources} retrieved successfully`,
	UPDATED: (resource: string) => `${resource} updated successfully`,
	DELETED: (resource: string) => `${resource} deleted successfully`,
} as const;
