import { PublicUser } from "../../../shared/types/user.js";
import { findAllCreators, findCreatorById } from "../model/creatorModel.js";

export async function getAllCreatorsService(): Promise<PublicUser[] | null> {
	return await findAllCreators();
}

export async function getCreatorService(userId: number): Promise<PublicUser | null> {
	return await findCreatorById(userId);
}
