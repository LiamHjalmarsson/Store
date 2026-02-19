import api from "../axios";
import type { User } from "../user/user";

interface loginRequest {
	email: string;
	password: string;
}

interface loginResponse {
	token: string;
	user: User;
}

export const login = (payload: loginRequest) => {
	return api.post<loginResponse>("auth/login", payload);
};
