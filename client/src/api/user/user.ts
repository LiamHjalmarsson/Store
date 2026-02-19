import api from "../axios";

export type AccountStatus = "active" | "suspended" | "banned";

export interface User {
	id: number;
	email: string;
	password: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	role: "user" | "admin" | "creator";
	account_status: AccountStatus;
	signed_to_newsletter: boolean;
	created_at: Date;
}

export interface GetUsersResponse {
	users: User[];
}

export const getUsers = () => {
	return api.get<GetUsersResponse>("/users");
};
