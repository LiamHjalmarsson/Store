export interface AuthUser {
	id: number;
	email: string;
	firstname: string | null;
	lastname: string | null;
	avatar: string | null;
	username: string;
	role: "user" | "admin" | "creator";
	account_status: "active" | "suspended" | "banned";
	signed_to_newsletter: boolean;
}

export interface AuthUserWithPassword extends AuthUser {
	password: string;
}

export interface AuthResponse {
	token: string;
	user: AuthUser;
}

export interface CreateUserPayload {
	email: string;
	password: string;
	username: string;
}
