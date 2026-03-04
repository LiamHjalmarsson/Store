import {
	createNewRank,
	deleteRankById,
	findAllRanks,
	findRankById,
	resolveRankByXp,
	updateRankById,
} from "../model/rankModel.js";
import { CreateRankPayload, UpdateRankPayload } from "../types/rank.js";

export const getAllRanksService = async () => {
	return await findAllRanks();
};

export const createRankService = async (payload: CreateRankPayload) => {
	return await createNewRank(payload);
};

export const getRankService = async (id: number) => {
	return await findRankById(id);
};

export const updateRankService = async (id: number, payload: UpdateRankPayload) => {
	return await updateRankById(id, payload);
};

export const deleteRankService = async (id: number) => {
	return await deleteRankById(id);
};

export const resolveRankService = async (xp: number) => {
	return await resolveRankByXp(xp);
};
