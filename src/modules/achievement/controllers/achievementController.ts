import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import { ACHIEVEMENT_MESSAGES } from "../constants/achievementMessages.js";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAllAchievementsService,
	getUserAchievementsService,
	updateAchievementService,
} from "../services/achievementService.js";
import type {
	AwardAchievementRequest,
	CreateAchievementRequest,
	DeleteAchievementRequest,
	UpdateAchievementRequest,
} from "../types/achievementRequest.js";
import { getAuthenticatedUserId } from "../../../shared/utils/auth/getAuthenticatedUserId.js";
import { SUCCESS_MESSAGES } from "../../../shared/constants/successMessages.js";

export const getAllAchievementsController = async (_: Request, res: Response) => {
	const achievements = await getAllAchievementsService();

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED_ALL("Achievements"), { achievements });
};

export const createAchievementController = async (req: CreateAchievementRequest, res: Response) => {
	const payload = req.body;

	const achievement = await createAchievementService(payload);

	return sendSuccess(res, SUCCESS_MESSAGES.CREATED("Achievement"), { achievement }, 201);
};

export const updateAchievementController = async (req: UpdateAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	const payload = req.body;

	const achievement = await updateAchievementService(achievementId, payload);

	return sendSuccess(res, SUCCESS_MESSAGES.UPDATED("Achievement"), { achievement });
};

export const deleteAchievementController = async (req: DeleteAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	await deleteAchievementService(achievementId);

	return sendSuccess(res, SUCCESS_MESSAGES.DELETED("Achievement"), { deleted: true });
};

export const getMyAchievementsController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const achievements = await getUserAchievementsService(userId);

	return sendSuccess(res, SUCCESS_MESSAGES.RETRIEVED("My Achievements"), { achievements });
};

export const awardAchievementController = async (req: AwardAchievementRequest, res: Response) => {
	const { user_id, achievement_id } = req.body;

	const { awarded } = await awardAchievementService(user_id, achievement_id);

	const message = awarded ? ACHIEVEMENT_MESSAGES.AWARDED : ACHIEVEMENT_MESSAGES.ALREADY_AWARDED;

	return sendSuccess(res, message, { awarded });
};
