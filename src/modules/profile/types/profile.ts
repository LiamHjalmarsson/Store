import { AccountRole, AccountStatus } from "../../../shared/types/user.js";

export interface Profile {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
	username: string;
	role: AccountRole;
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	created_at: Date | string;
	updated_at: Date | string;
}

export interface UpdateProfilePayload {
	firstname?: string | null;
	lastname?: string | null;
	avatar?: string | null;
	username?: string | null;
	signed_to_newsletter?: boolean;
}

