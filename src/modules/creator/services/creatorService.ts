import { NotFoundError } from "../../../shared/errors/notfound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import {
	createCreatorQuery,
	deleteCreatorByIdQuery,
	findAllCreatorsQuery,
	findCreatorByIdQuery,
	updateCreatorByIdQuery,
} from "../repositories/creatorRepository.js";
import { CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";
import { CREATOR_MESSAGES } from "../constants/creatorMessages.js";

export const getAllCreatorsService = async (pagination: PaginationQuery) => {
	return findAllCreatorsQuery(pagination);
};

export const createCreatorService = async (payload: CreateCreatorPayload) => {
	return createCreatorQuery(payload);
};

export const getCreatorService = async (creatorId: number) => {
	const creator = await findCreatorByIdQuery(creatorId);

	if (!creator) {
		throw new NotFoundError(CREATOR_MESSAGES.NOT_FOUND);
	}

	return creator;
};

export const updateCreatorService = async (creatorId: number, payload: UpdateCreatorPayload) => {
	const creator = await updateCreatorByIdQuery(creatorId, payload);

	if (!creator) {
		throw new NotFoundError(CREATOR_MESSAGES.NOT_FOUND);
	}

	return creator;
};

export const deleteCreatorService = async (creatorId: number) => {
	const deleted = await deleteCreatorByIdQuery(creatorId);

	if (!deleted) {
		throw new NotFoundError(CREATOR_MESSAGES.PROFILE_NOT_FOUND);
	}

	return deleted;
};
