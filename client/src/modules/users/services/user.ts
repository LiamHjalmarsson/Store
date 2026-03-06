import api from "@/api/axios";
import type { GetUsersResponse } from "../types/user";

export const getUsers = () => {
	return api.get<GetUsersResponse>("/users");
};
