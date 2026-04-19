import type { AccountRole, AccountStatus } from "../../../shared/types/user.js";

export interface AuthUser {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
	username: string;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
}

export interface AuthUserCredentials extends AuthUser {
	password: string;
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

export type CreateAuthUserPayload = RegisterPayload;

export interface AuthSession {
	token: string;
	user: AuthUser;
}

export type AuthResponse = AuthSession;

