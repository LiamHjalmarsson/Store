export type AccountStatus = "active" | "suspended" | "banned" | "inactive";

export type AccountRole = "user" | "admin" | "creator";

export interface User {
	id: number;
	email: string;
	password: string;
	username: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	bio?: string;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	last_login: Date | string;
	created_at: Date | string;
	updated_at: Date | string;
}

export type PublicUser = Omit<User, "password">;
