import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	deleteProfileByUserIdQuery,
	findProfileByUserIdQuery,
	updateProfileByUserIdQuery,
} from "../repositories/profileRepository.js";
import { UpdateProfilePayload } from "../types/profile.js";

export async function getProfileService(userId: number) {
	const profile = await findProfileByUserIdQuery(userId);

	if (!profile) {
		throw new NotFoundError("User not found");
	}

	return profile;
}

export async function updateProfileService(userId: number, payload: UpdateProfilePayload) {
	const profile = await updateProfileByUserIdQuery(userId, payload);

	if (!profile) {
		throw new NotFoundError("User not found");
	}

	return profile;
}

export async function deleteProfileService(userId: number) {
	const deleted = await deleteProfileByUserIdQuery(userId);

	if (!deleted) {
		throw new NotFoundError("User not found");
	}

	return true;
}

