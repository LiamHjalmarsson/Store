import { Request, Response } from "express";
import {
	createRankService,
	deleteRankService,
	getAllRanksService,
	getRankService,
	resolveRankService,
	updateRankService,
} from "../services/rankService.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAllRanks = async (_: Request, res: Response) => {
	const ranks = await getAllRanksService();

	return sendSuccess(res, "Ranks retrieved successfully", { ranks });
};

export const createRank = async (req: Request, res: Response) => {
	const rank = await createRankService(req.body);

	return sendSuccess(res, "Rank created successfully", { rank }, 201);
};

export const getRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await getRankService(id);

	return sendSuccess(res, "Rank retrieved successfully", { rank });
};

export const updateRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await updateRankService(id, req.body);

	return sendSuccess(res, "Rank updated successfully", { rank });
};

export const deleteRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await deleteRankService(id);

	if (!rank) {
		throw new BadRequestError("No rank to delete");
	}

	return sendSuccess(res, "Rank deleted successfully", null);
};

export const resolveRank = async (req: Request, res: Response) => {
	const xp = Number(req.query.xp);

	if (Number.isNaN(xp) || xp < 0) {
		throw new BadRequestError("Invalid xp");
	}

	const rank = await resolveRankService(xp);

	return sendSuccess(res, "Rank resolved successfully", { rank });
};
