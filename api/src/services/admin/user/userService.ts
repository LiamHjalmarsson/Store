import { findUserById, updateUserById, deleteUserById, findAllUsers } from "../../../models/user/userModel.js";
import { PublicUser, User } from "../../../types/user.js";

export async function getAllUsersService(): Promise<PublicUser[]> {
	return await findAllUsers();
}

export async function getUserService(userId: number): Promise<User | null> {
	return await findUserById(userId);
}

export async function updateUserService(userId: number, data: Partial<User>): Promise<User | null> {
	return await updateUserById(userId, data);
}

export async function deleteUserService(userId: number): Promise<boolean> {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
