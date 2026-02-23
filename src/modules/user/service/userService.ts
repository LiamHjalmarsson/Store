import { PublicUser } from "../../../types/user.js";
import { deleteUserById, findAllUsers, findUserById, updateUserById } from "../model/userModel.js";

export const getAllUsersService = async () => {
	return await findAllUsers();
};

export const getUserService = async (userId: number) => {
	return await findUserById(userId);
};

export const updateUserService = async (userId: number, data: Partial<PublicUser>) => {
	return await updateUserById(userId, data);
};

export const deleteUserService = async (userId: number) => {
	const deleted = await deleteUserById(userId);

	return !!deleted;
};
