export type AccountStatus = "active" | "suspended" | "banned";

export type AccountRole = "user" | "admin" | "creator";

export interface User {
	id: number;
	email: string;
	password: string;
	username: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
	bio: string | null;
	xp: number;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	last_login: Date | string | null;
	created_at: Date | string;
	updated_at: Date | string;
}

export type PublicUser = Omit<User, "password">;
