import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { hashPassword } from "../../../shared/utils/auth/password.js";
import {
	createUserQuery,
	deleteUserByIdQuery,
	findAllUsersQuery,
	findUserByIdQuery,
	updateUserByIdQuery,
} from "../repositories/userRepository.js";
import { CreateUserPayload, UpdateUserPayload } from "../types/user.js";

export const getAllUsersService = async (pagination: PaginationQuery) => {
	return findAllUsersQuery(pagination);
};

export const createUserService = async (payload: CreateUserPayload) => {
	const hashed = await hashPassword(payload.password);

	return createUserQuery({ ...payload, password: hashed });
};

export const getUserService = async (userId: number) => {
	const user = await findUserByIdQuery(userId);

	if (!user) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return user;
};

export const updateUserService = async (userId: number, payload: UpdateUserPayload) => {
	const user = await updateUserByIdQuery(userId, payload);

	if (!user) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return user;
};

export const deleteUserService = async (userId: number) => {
	const deleted = await deleteUserByIdQuery(userId);

	if (!deleted) {
		throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
	}

	return deleted;
};
