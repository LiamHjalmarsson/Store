export type AuthRole = "user" | "admin" | "creator";

export type AccountStatus = "active" | "suspended" | "banned";

export interface AuthUser {
	id: number;
	email: string;
	username: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	role: AuthRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	email: string;
	password: string;
	username: string;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

export interface UserResponse {
	token: string;
	user: AuthUser;
}
