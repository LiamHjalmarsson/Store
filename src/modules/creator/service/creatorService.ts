import {
	createNewCreator,
	deleteCreator,
	findAllCreators,
	findCreatorById,
	updateCreator,
} from "../model/creatorModel.js";
import { CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";

export async function getAllCreatorsService() {
	return await findAllCreators();
}

export const createCreatorService = async (payload: CreateCreatorPayload) => {
	return await createNewCreator(payload);
};

export async function getCreatorService(userId: number) {
	return await findCreatorById(userId);
}

export const updateCreatorService = async (creatorId: number, payload: UpdateCreatorPayload) => {
	return updateCreator(creatorId, payload);
};

export const deleteCreatorService = async (creatorId: number) => {
	return deleteCreator(creatorId);
};
