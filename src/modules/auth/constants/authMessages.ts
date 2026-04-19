import type { AccountStatus } from "../../../shared/types/user.js";

export const AUTH_MESSAGES = {
	INVALID_CREDENTIALS: "Invalid email or password",
	USER_LOGGED_OUT: "User logged out successfully",

	REGISTERED: (username: string) => `${username} registered successfully`,
	LOGGED_IN: (username: string) => `${username} logged in successfully`,
	CURRENT_USER_RETRIEVED: (username: string) => `${username} retrieved successfully`,
	ACCOUNT_STATUS: (status: AccountStatus) => `Account is ${status}`,
} as const;
