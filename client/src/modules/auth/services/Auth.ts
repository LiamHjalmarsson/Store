import api from "@/api/axios";
import type { AuthResponse, LoginPayload, RegisterPayload, MeResponse } from "../types/auth";

export const loginApi = (payload: LoginPayload) => {
	return api.post<AuthResponse>("auth/login", payload);
};

export const registerApi = (payload: RegisterPayload) => {
	return api.post<AuthResponse>("auth/register", payload);
};

export const logoutApi = () => {
	return api.post("auth/logout");
};

export const getUserApi = () => {
	return api.get<MeResponse>("auth/me");
};
