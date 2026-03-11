import type { APIResponse } from "@/types/api";
import api from "./axios";

export async function get<T>(url: string) {
	const res = await api.get<APIResponse<T>>(url);

	return res.data.data;
}
