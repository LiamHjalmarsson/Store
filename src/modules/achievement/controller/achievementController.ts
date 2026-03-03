import { Request, Response } from "express";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAllAchivementsService,
	getUserAchievementsService,
	updateAchievementService,
} from "../service/achievementService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { NotFoundError } from "../../../shared/errors/notFound.js";

export const getAllAchievements = async (_: Request, res: Response) => {
	const achievements = await getAllAchivementsService();

	res.json({ achievements });
};

export const createAchievement = async (req: Request, res: Response) => {
	const created = await createAchievementService(req.body);

	res.json({ achievement: created });
};

export const updateAchievement = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const updated = await updateAchievementService(id, req.body);

	if (!updated) {
		throw new NotFoundError("Achievement not found");
	}

	res.json({ achievement: updated });
};

export const deleteAchievement = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteAchievementService(id);

	if (!deleted) {
		throw new NotFoundError("Achievement not found");
	}

	res.json({ message: "Achievement deleted" });
};

export const getMyAchievements = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const achievements = await getUserAchievementsService(userId);

	res.json({ achievements });
};

export const awardAchievement = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const { achievement_id } = req.body;

	await awardAchievementService(userId, achievement_id);

	res.json({ message: "Achievement awarded" });
};
