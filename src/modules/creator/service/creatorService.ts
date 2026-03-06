import { PaginationQuery } from "../../../shared/types/pagination.js";
import {
	createNewCreator,
	deleteCreatorById,
	findAllCreators,
	findCreatorById,
	updateCreatorById,
} from "../model/creatorModel.js";
import { CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";

export const getAllCreatorsService = async (pagination: PaginationQuery) => {
	return await findAllCreators(pagination);
};

export const createCreatorService = async (payload: CreateCreatorPayload) => {
	return await createNewCreator(payload);
};

export const getCreatorService = async (userId: number) => {
	return await findCreatorById(userId);
};

export const updateCreatorService = async (creatorId: number, payload: UpdateCreatorPayload) => {
	return updateCreatorById(creatorId, payload);
};

export const deleteCreatorService = async (creatorId: number) => {
	return deleteCreatorById(creatorId);
};
