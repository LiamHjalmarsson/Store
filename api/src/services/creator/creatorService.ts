import { findAllCreators, findCreatorById } from "../../models/creator/creatorModel.js";
import { PublicUser } from "../../types/user.js";

export async function getAllCreatorsService(): Promise<PublicUser[] | null> {
	return await findAllCreators();
}

export async function getCreatorService(userId: number): Promise<PublicUser | null> {
	return await findCreatorById(userId);
}
