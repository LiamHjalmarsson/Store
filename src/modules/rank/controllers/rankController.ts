import { Request, Response } from "express";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	createRankService,
	deleteRankService,
	getAllRanksService,
	getRankService,
	resolveRankService,
	updateRankService,
} from "../services/rankService.js";
import { CreateRankPayload, RankParams, UpdateRankPayload } from "../types/rank.js";
import { RANK_MESSAGES } from "../constants/rankMessages.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/sucessMessages.js";

export const getAllRanksController = async (_: Request, res: Response) => {
	const ranks = await getAllRanksService();

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED_ALL("Ranks"), { ranks });
};

export const createRankController = async (req: Request, res: Response) => {
	const payload = req.body as CreateRankPayload;

	const rank = await createRankService(payload);

	return sendSuccess(res, SUCCESS_MESSAGES.CREATED("Rank"), { rank }, 201);
};

export const getRankController = async (req: Request<RankParams>, res: Response) => {
	const id = Number(req.params.id);

	const rank = await getRankService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("Rank"), { rank });
};

export const updateRankController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body as UpdateRankPayload;

	const rank = await updateRankService(id, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Rank"), { rank });
};

export const deleteRankController = async (req: Request<RankParams>, res: Response) => {
	const id = Number(req.params.id);

	await deleteRankService(id);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Rank"), null);
};

export const resolveRankController = async (req: Request, res: Response) => {
	const xp = Number(req.query.xp);

	const rank = await resolveRankService(xp);

	return sendSuccess(res, RANK_MESSAGES.RESOLVED, { rank });
};
