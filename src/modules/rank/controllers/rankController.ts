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

export const getAllRanksController = async (_: Request, res: Response) => {
	const ranks = await getAllRanksService();

	return sendSuccess(res, RANK_MESSAGES.RETRIEVED_ALL, { ranks });
};

export const createRankController = async (req: Request, res: Response) => {
	const payload = req.body as CreateRankPayload;

	const rank = await createRankService(payload);

	return sendSuccess(res, RANK_MESSAGES.CREATED, { rank }, 201);
};

export const getRankController = async (req: Request<RankParams>, res: Response) => {
	const id = Number(req.params.id);

	const rank = await getRankService(id);

	return sendSuccess(res, RANK_MESSAGES.RETRIEVED, { rank });
};

export const updateRankController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const payload = req.body as UpdateRankPayload;

	const rank = await updateRankService(id, payload);

	return sendSuccess(res, RANK_MESSAGES.UPDATED, { rank });
};

export const deleteRankController = async (req: Request<RankParams>, res: Response) => {
	const id = Number(req.params.id);

	await deleteRankService(id);

	return sendSuccess(res, RANK_MESSAGES.DELETED, null);
};

export const resolveRankController = async (req: Request, res: Response) => {
	const xp = Number(req.query.xp);

	if (Number.isNaN(xp) || xp < 0) {
		throw new BadRequestError("Invalid xp");
	}

	const rank = await resolveRankService(xp);

	return sendSuccess(res, RANK_MESSAGES.RESOLVED, { rank });
};
