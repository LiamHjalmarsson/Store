import { Request, Response } from "express";
import {
	createRankService,
	deleteRankService,
	getAllRanksService,
	getRankService,
	resolveRankService,
	updateRankService,
} from "../service/rankService.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";

export const getAllRanks = async (_: Request, res: Response) => {
	const ranks = await getAllRanksService();

	res.json({ ranks });
};

export const createRank = async (req: Request, res: Response) => {
	const rank = await createRankService(req.body);

	res.status(201).json({ rank });
};

export const getRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await getRankService(id);

	res.json({ rank });
};

export const updateRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await updateRankService(id, req.body);

	res.json({ rank });
};

export const deleteRank = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const rank = await deleteRankService(id);

	if (!rank) {
		throw new BadRequestError("No rank to delete");
	}

	res.json({ message: "Rank deleted" });
};

export const resolveRank = async (req: Request, res: Response) => {
	const xp = Number(req.query.xp);

	if (Number.isNaN(xp) || xp < 0) {
		throw new BadRequestError("Invalid xp");
	}

	const rank = await resolveRankService(xp);

	res.json({ rank });
};
