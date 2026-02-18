import axios from "axios";

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

export default api;
