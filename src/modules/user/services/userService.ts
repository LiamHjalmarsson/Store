import { PaginationQuery } from "../../../shared/types/pagination.js";
import { hashPassword } from "../../../shared/utils/auth/password.js";
import {
	createNewUser,
	deleteUserById,
	findAllUsers,
	findUserById,
	updateUserById,
} from "../repositories/userRepository.js";
import { CreateNewUserPayload, UpdateUserPayload } from "../types/userType.js";

export const getAllUsersService = async (pagination: PaginationQuery) => {
	return await findAllUsers(pagination);
};

export const createUserService = async (payload: CreateNewUserPayload) => {
	const hashed = await hashPassword(payload.password);

	return await createNewUser({ ...payload, password: hashed });
};

export const getUserService = async (userId: number) => {
	return await findUserById(userId);
};

export const updateUserService = async (userId: number, payload: UpdateUserPayload) => {
	return await updateUserById(userId, payload);
};

export const deleteUserService = async (userId: number) => {
	const deleted = await deleteUserById(userId);

	return !!deleted;
};
