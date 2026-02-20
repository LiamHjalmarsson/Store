import axios from "axios";
import { useAuthStore } from "../store/auth";

export type APIResponse<T> = {
	success: boolean;
	content: T;
	status?: number;
};

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

api.interceptors.request.use((config) => {
	const authStore = useAuthStore();

	if (authStore.token) {
		config.headers = config.headers ?? {};

		config.headers["Authorization"] = `Bearer ${authStore.token}`;
	}
	return config;
});

export default api;
