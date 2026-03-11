import api from "@/api/axios";
import type { AuthResponse, LoginPayload, RegisterPayload, MeResponse } from "../types/auth";
import type { APIResponse } from "@/types/api";

export const loginApi = (payload: LoginPayload) => {
	return api.post<APIResponse<AuthResponse>>("auth/login", payload);
};

export const registerApi = (payload: RegisterPayload) => {
	return api.post<APIResponse<AuthResponse>>("auth/register", payload);
};

export const logoutApi = () => {
	return api.post("auth/logout");
};

export const getUserApi = () => {
	return api.get<APIResponse<MeResponse>>("auth/me");
};
