import { Request, Response } from "express";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess } from "../../../shared/utils/http/respond.js";
import {
	awardAchievementService,
	createAchievementService,
	deleteAchievementService,
	getAllAchievementsService,
	getUserAchievementsService,
	updateAchievementService,
} from "../services/achievementService.js";
import {
	AwardAchievementRequest,
	CreateAchievementRequest,
	DeleteAchievementRequest,
	UpdateAchievementRequest,
} from "../types/achievementRequest.js";
import { ACHIEVEMENT_MESSAGES } from "../constants/achievementMessages.js";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";

export const getAllAchievementsController = async (_: Request, res: Response) => {
	const achievements = await getAllAchievementsService();

	return sendSuccess(res, ACHIEVEMENT_MESSAGES.RETRIEVED_ALL, achievements);
};

export const createAchievementController = async (req: CreateAchievementRequest, res: Response) => {
	const payload = req.body;

	const achievement = await createAchievementService(payload);

	return sendSuccess(res, ACHIEVEMENT_MESSAGES.CREATED, achievement, 201);
};

export const updateAchievementController = async (req: UpdateAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	const payload = req.body;

	const achievement = await updateAchievementService(achievementId, payload);

	return sendSuccess(res, ACHIEVEMENT_MESSAGES.UPDATED, achievement);
};

export const deleteAchievementController = async (req: DeleteAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	await deleteAchievementService(achievementId);

	return sendSuccess(res, ACHIEVEMENT_MESSAGES.DELETED, null);
};

export const getMyAchievementsController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const achievements = await getUserAchievementsService(userId);

	return sendSuccess(res, ACHIEVEMENT_MESSAGES.USER_RETRIEVED, achievements);
};

export const awardAchievementController = async (req: AwardAchievementRequest, res: Response) => {
	const { user_id, achievement_id } = req.body;

	const { awarded } = await awardAchievementService(user_id, achievement_id);

	const message = awarded ? ACHIEVEMENT_MESSAGES.AWARDED : ACHIEVEMENT_MESSAGES.ALREADY_AWARDED;

	return sendSuccess(res, message, null);
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	return userId;
}
