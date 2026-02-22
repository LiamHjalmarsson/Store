import { PublicUser } from "../../../shared/types/user.js";
import { deleteUserById, findUserById, updateUserById } from "../model/profileModel.js";

export async function getProfileService(userId: number): Promise<PublicUser | null> {
	return await findUserById(userId);
}

export async function updateProfileService(userId: number, data: Partial<PublicUser>): Promise<PublicUser | null> {
	return await updateUserById(userId, data);
}

export async function deleteProfileService(userId: number): Promise<boolean> {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
