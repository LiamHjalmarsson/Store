import api from "../axios";

export interface AuthUser {
	id: number;
	email: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	role: "user" | "admin" | "creator";
}

export interface loginRequest {
	email: string;
	password: string;
}

export interface registerRequest {
	email: string;
	password: string;
	username: string;
}

interface loginResponse {
	token: string;
	user: AuthUser;
}

export const loginApi = (payload: loginRequest) => {
	return api.post<loginResponse>("auth/login", payload);
};

export const logoutApi = () => {
	return api.post("auth/logout");
};

export const getUserApi = () => {
	return api.get<{ user: AuthUser }>("auth/me");
};

export const registerApi = (payload: registerRequest) => {
	return api.post<loginResponse>("auth/register", payload);
};
