export type AccountStatus = "active" | "suspended" | "banned";

export interface User {
	id: number;
	email: string;
	password: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	bio?: string;
	role: "user" | "admin" | "creator";
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	created_at: Date;
	updated_at: Date;
}

export type PublicUser = Omit<User, "password">;

export interface CreateUserPayload {
	email: string;
	password: string;
	username?: string;
}

export interface UpdateUserPayload {
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	signed_to_newsletter?: boolean;
}

export interface CreatorProfile {
	user_id: number;
	website?: string;
	social_twitter?: string;
	social_instagram?: string;
	social_youtube?: string;
	verified_creator: boolean;
	featured: boolean;
	total_sales: number;
	total_earnings: number;
	created_at: Date;
	updated_at: Date;
}
