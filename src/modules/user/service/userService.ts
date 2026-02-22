import { PublicUser } from "../../../types/user.js";
import { deleteUserById, findAllUsers, findUserById, updateUserById } from "../model/userModel.js";

export async function getAllUsersService(): Promise<PublicUser[]> {
	return await findAllUsers();
}

export async function getUserService(userId: number): Promise<PublicUser | null> {
	return await findUserById(userId);
}

export async function updateUserService(userId: number, data: Partial<PublicUser>): Promise<PublicUser | null> {
	return await updateUserById(userId, data);
}

export async function deleteUserService(userId: number): Promise<boolean> {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
