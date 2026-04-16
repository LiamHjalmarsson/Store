import type { Request } from "express";
import { ERROR_MESSAGES } from "../../../shared/constants/errorMessages.js";
import { UnauthorizedError } from "../../../shared/errors/unauthorized.js";
import type { AuthenticatedRequest } from "../../../shared/middlewares/authenticated.js";
import { sendSuccess, type ApiResponse } from "../../../shared/utils/http/respond.js";
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
import type {
	AchievementResponseData,
	AchievementsResponseData,
	AwardAchievementResponseData,
	DeleteAchievementResponseData,
} from "../types/achievementResponse.js";

export const getAllAchievementsController = async (_: Request, res: ApiResponse<AchievementsResponseData>) => {
	const achievements = await getAllAchievementsService();

	sendSuccess(res, ACHIEVEMENT_MESSAGES.RETRIEVED_ALL, { achievements });
};

export const createAchievementController = async (
	req: CreateAchievementRequest,
	res: ApiResponse<AchievementResponseData>,
) => {
	const payload = req.body;

	const achievement = await createAchievementService(payload);

	sendSuccess(res, ACHIEVEMENT_MESSAGES.CREATED, { achievement }, 201);
};

export const updateAchievementController = async (
	req: UpdateAchievementRequest,
	res: ApiResponse<AchievementResponseData>,
) => {
	const achievementId = Number(req.params.id);
	const payload = req.body;

	const achievement = await updateAchievementService(achievementId, payload);

	sendSuccess(res, ACHIEVEMENT_MESSAGES.UPDATED, { achievement });
};

export const deleteAchievementController = async (
	req: DeleteAchievementRequest,
	res: ApiResponse<DeleteAchievementResponseData>,
) => {
	const achievementId = Number(req.params.id);

	await deleteAchievementService(achievementId);

	sendSuccess(res, ACHIEVEMENT_MESSAGES.DELETED, { deleted: true });
};

export const getMyAchievementsController = async (
	req: AuthenticatedRequest,
	res: ApiResponse<AchievementsResponseData>,
) => {
	const userId = getAuthenticatedUserId(req);

	const achievements = await getUserAchievementsService(userId);

	sendSuccess(res, ACHIEVEMENT_MESSAGES.USER_RETRIEVED, { achievements });
};

export const awardAchievementController = async (
	req: AwardAchievementRequest,
	res: ApiResponse<AwardAchievementResponseData>,
) => {
	const { user_id, achievement_id } = req.body;

	const { awarded } = await awardAchievementService(user_id, achievement_id);

	const message = awarded ? ACHIEVEMENT_MESSAGES.AWARDED : ACHIEVEMENT_MESSAGES.ALREADY_AWARDED;

	sendSuccess(res, message, { awarded });
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (userId === undefined || userId === null) {
		throw new UnauthorizedError(ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
	}

	return userId;
}

