import { AccountRole, AccountStatus } from "../../../shared/types/user.js";

export interface UpdateUserPayload {
	firstname?: string | null;
	lastname?: string | null;
	avatar?: string | null;
	username?: string;
	signed_to_newsletter?: boolean;
	role?: AccountRole;
	account_status?: AccountStatus;
}

export interface CreateUserPayload {
	email: string;
	password: string;
	username: string;
	firstname?: string | null;
	lastname?: string | null;
	avatar?: string | null;
	role?: AccountRole;
	account_status?: AccountStatus;
	signed_to_newsletter?: boolean;
}

export interface UserParams {
	id: string;
}
