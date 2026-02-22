export type AccountStatus = "active" | "suspended" | "banned" | "inactive";

export type AccountRole = "user" | "admin" | "creator";

export interface User {
	id: number;
	email: string;
	password: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	bio?: string;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	last_login: Date;
	created_at: Date;
	updated_at: Date;
}

export type PublicUser = Omit<User, "password">;
