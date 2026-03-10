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
import { sendSuccess } from "../../../shared/utils/respond.js";

export const getAllAchievements = async (_: Request, res: Response) => {
	const achievements = await getAllAchivementsService();

	return sendSuccess(res, "Achievements retrieved successfully", { achievements });
};

export const createAchievement = async (req: Request, res: Response) => {
	const achievement = await createAchievementService(req.body);

	return sendSuccess(res, "Achievement created successfully", { achievement }, 201);
};

export const updateAchievement = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const achievement = await updateAchievementService(id, req.body);

	if (!achievement) {
		throw new NotFoundError("Achievement not found");
	}

	return sendSuccess(res, "Achievement updated successfully", { achievement });
};

export const deleteAchievement = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const deleted = await deleteAchievementService(id);

	if (!deleted) {
		throw new NotFoundError("Achievement not found");
	}

	return sendSuccess(res, "Achievement deleted successfully", null);
};

export const getMyAchievements = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const achievements = await getUserAchievementsService(userId);

	return sendSuccess(res, "User achievements retrieved successfully", { achievements });
};

export const awardAchievement = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const { achievement_id } = req.body;

	await awardAchievementService(userId, achievement_id);

	return sendSuccess(res, "Achievement awarded successfully", null);
};
