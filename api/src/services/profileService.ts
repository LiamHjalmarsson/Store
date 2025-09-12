import { findUserById, updateUserById, deleteUserById } from "../models/user/userModel.js";
import { User } from "../types/user.js";

export async function getProfileService(userId: number): Promise<User | null> {
	return await findUserById(userId);
}

export async function updateProfileService(userId: number, data: Partial<User>): Promise<User | null> {
	return await updateUserById(userId, data);
}

export async function deleteProfileService(userId: number): Promise<boolean> {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
