import { NotFoundError } from "../../../shared/errors/notFound.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import {
	createCreatorQuery,
	deleteCreatorByIdQuery,
	findAllCreatorsQuery,
	findCreatorByIdQuery,
	updateCreatorByIdQuery,
} from "../repositories/creatorRepository.js";
import { CreateCreatorPayload, UpdateCreatorPayload } from "../types/creator.js";

export const getAllCreatorsService = async (pagination: PaginationQuery) => {
	return findAllCreatorsQuery(pagination);
};

export const createCreatorService = async (payload: CreateCreatorPayload) => {
	return createCreatorQuery(payload);
};

export const getCreatorService = async (creatorId: number) => {
	const creator = await findCreatorByIdQuery(creatorId);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	return creator;
};

export const updateCreatorService = async (creatorId: number, payload: UpdateCreatorPayload) => {
	const creator = await updateCreatorByIdQuery(creatorId, payload);

	if (!creator) {
		throw new NotFoundError("Creator not found");
	}

	return creator;
};

export const deleteCreatorService = async (creatorId: number) => {
	const deleted = await deleteCreatorByIdQuery(creatorId);

	if (!deleted) {
		throw new NotFoundError("Creator profile not found");
	}

	return deleted;
};
