import { PaginationQuery } from "../../../shared/types/pagination.js";
import { PublicUser } from "../../../shared/types/user.js";
import { hashPassword } from "../../../shared/utils/auth/password.js";
import { CreateUserPayload } from "../../auth/types/authType.js";
import { createNewUser, deleteUserById, findAllUsers, findUserById, updateUserById } from "../model/userModel.js";

export const getAllUsersService = async (pagination: PaginationQuery) => {
	return await findAllUsers(pagination);
};

export const createUserService = async (payload: CreateUserPayload) => {
	const hashed = await hashPassword(payload.password);

	return await createNewUser({ ...payload, password: hashed });
};

export const getUserService = async (userId: number) => {
	return await findUserById(userId);
};

export const updateUserService = async (userId: number, payload: Partial<PublicUser>) => {
	return await updateUserById(userId, payload);
};

export const deleteUserService = async (userId: number) => {
	const deleted = await deleteUserById(userId);

	return !!deleted;
};
