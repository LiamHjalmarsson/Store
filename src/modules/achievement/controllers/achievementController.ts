import { Request, Response } from "express";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAllAchivementsService,
	getUserAchievementsService,
	updateAchievementService,
} from "../services/achievementService.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";

export const getAllAchievementsController = async (_: Request, res: Response) => {
	const achievements = await getAllAchivementsService();

	return sendSuccess(res, "Achievements retrieved successfully", { achievements });
};

export const createAchievementController = async (req: Request, res: Response) => {
	const achievement = await createAchievementService(req.body);

	return sendSuccess(res, "Achievement created successfully", { achievement }, 201);
};

export const updateAchievementController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const achievement = await updateAchievementService(id, req.body);

	return sendSuccess(res, "Achievement updated successfully", { achievement });
};

export const deleteAchievementController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteAchievementService(id);

	return sendSuccess(res, "Achievement deleted successfully", null);
};

export const getMyAchievementsController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const achievements = await getUserAchievementsService(userId);

	return sendSuccess(res, "User achievements retrieved successfully", { achievements });
};

export const awardAchievementController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = Number(req.user!.id);

	const { achievement_id } = req.body;

	await awardAchievementService(userId, achievement_id);

	return sendSuccess(res, "Achievement awarded successfully", null);
};
