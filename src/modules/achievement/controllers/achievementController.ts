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
import { AwardAchievementPayload, CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievement.js";

type AchievementIdParams = {
	id: string;
};

type CreateAchievementRequest = Request<Record<string, never>, unknown, CreateAchievementPayload>;

type UpdateAchievementRequest = Request<AchievementIdParams, unknown, UpdateAchievementPayload>;

type DeleteAchievementRequest = Request<AchievementIdParams>;

type AwardAchievementRequest = AuthenticatedRequest<Record<string, never>, unknown, AwardAchievementPayload>;

export const getAllAchievementsController = async (_: Request, res: Response) => {
	const achievements = await getAllAchievementsService();

	return sendSuccess(res, "Achievements retrieved successfully", { achievements });
};

export const createAchievementController = async (req: CreateAchievementRequest, res: Response) => {
	const payload = req.body;

	const achievement = await createAchievementService(payload);

	return sendSuccess(res, "Achievement created successfully", { achievement }, 201);
};

export const updateAchievementController = async (req: UpdateAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	const payload = req.body;

	const achievement = await updateAchievementService(achievementId, payload);

	return sendSuccess(res, "Achievement updated successfully", { achievement });
};

export const deleteAchievementController = async (req: DeleteAchievementRequest, res: Response) => {
	const achievementId = Number(req.params.id);

	await deleteAchievementService(achievementId);

	return sendSuccess(res, "Achievement deleted successfully", null);
};

export const getMyAchievementsController = async (req: AuthenticatedRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const achievements = await getUserAchievementsService(userId);

	return sendSuccess(res, "User achievements retrieved successfully", { achievements });
};

export const awardAchievementController = async (req: AwardAchievementRequest, res: Response) => {
	const userId = getAuthenticatedUserId(req);

	const { achievement_id } = req.body;

	const { awarded } = await awardAchievementService(userId, achievement_id);

	const message = awarded ? "Achievement awarded successfully" : "Achievement already awarded";

	return sendSuccess(res, message, null);
};

function getAuthenticatedUserId(req: AuthenticatedRequest) {
	const userId = req.user?.id;

	if (!userId) {
		throw new UnauthorizedError("Authentication required");
	}

	return userId;
}
