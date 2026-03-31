import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	createRankQuery,
	deleteRankByIdQuery,
	findAllRanksQuery,
	findRankByIdQuery,
	resolveRankByXpQuery,
	updateRankByIdQuery,
} from "../repositories/rankRepository.js";
import { CreateRankPayload, UpdateRankPayload } from "../types/rank.js";

export const getAllRanksService = async () => {
	return findAllRanksQuery();
};

export const createRankService = async (payload: CreateRankPayload) => {
	return createRankQuery(payload);
};

export const getRankService = async (rankId: number) => {
	const rank = await findRankByIdQuery(rankId);

	if (!rank) {
		throw new NotFoundError("Rank not found");
	}

	return rank;
};

export const updateRankService = async (rankId: number, payload: UpdateRankPayload) => {
	const rank = await updateRankByIdQuery(rankId, payload);

	if (!rank) {
		throw new NotFoundError("Rank not found");
	}

	return rank;
};

export const deleteRankService = async (rankId: number) => {
	const deleted = await deleteRankByIdQuery(rankId);

	if (!deleted) {
		throw new NotFoundError("Rank not found");
	}

	return deleted;
};

export const resolveRankService = async (xp: number) => {
	return resolveRankByXpQuery(xp);
};

