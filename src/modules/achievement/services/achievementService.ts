import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	awardAchievementToUserQuery,
	createAchievementQuery,
	deleteAchievementByIdQuery,
	findAchievementsByUserIdQuery,
	findAllAchievementsQuery,
	updateAchievementById,
} from "../repositories/achievementRepository.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievement.js";

export const getAllAchievementsService = async () => {
	return findAllAchievementsQuery();
};

export const createAchievementService = async (payload: CreateAchievementPayload) => {
	return createAchievementQuery(payload);
};

export const updateAchievementService = async (achievementId: number, payload: UpdateAchievementPayload) => {
	const achievement = await updateAchievementById(achievementId, payload);

	if (!achievement) {
		throw new NotFoundError("Achievement not found");
	}

	return achievement;
};

export const deleteAchievementService = async (achievementId: number) => {
	const deleted = await deleteAchievementByIdQuery(achievementId);

	if (!deleted) {
		throw new NotFoundError("Achievement not found");
	}

	return deleted;
};

export const awardAchievementService = async (userId: number, achievementId: number) => {
	return awardAchievementToUserQuery(userId, achievementId);
};

export const getUserAchievementsService = async (userId: number) => {
	return findAchievementsByUserIdQuery(userId);
};

