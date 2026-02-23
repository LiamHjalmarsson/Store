import { PublicUser } from "../../../types/user.js";
import { deleteUserById, findUserById, updateUserById } from "../model/profileModel.js";

export async function getProfileService(userId: number) {
	return await findUserById(userId);
}

export async function updateProfileService(userId: number, data: Partial<PublicUser>) {
	return await updateUserById(userId, data);
}

export async function deleteProfileService(userId: number) {
	const deleted = await deleteUserById(userId);

	return !!deleted;
}
