import api from "../axios";

interface User {
	id: number;
	email: string;
	firstname?: string;
	lastname?: string;
	avatar?: string;
	username?: string;
	role: "user" | "admin" | "creator";
}

interface loginRequest {
	email: string;
	password: string;
}

interface loginResponse {
	token: string;
	user: User;
}

export const loginApi = (payload: loginRequest) => {
	return api.post<loginResponse>("auth/login", payload);
};

export const logoutApi = () => {
	return api.post("auth/logout");
};

export const getUserApi = () => {
	return api.get<{ user: User }>("auth/me");
};
