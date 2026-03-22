import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	awardAchievementToUserQuery,
	createAchievementQuery,
	deleteAchievementByIdQuery,
	findAchievementsQuery,
	findUserAchievementsQuery,
	updateAchievementByIdQuery,
} from "../repository/achievementRepository.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export const getAllAchivementsService = async () => {
	return await findAchievementsQuery();
};

export const createAchievementService = async (payload: CreateAchievementPayload) => {
	return await createAchievementQuery(payload);
};

export const updateAchievementService = async (id: number, payload: UpdateAchievementPayload) => {
	const achievement = await updateAchievementByIdQuery(id, payload);

	if (!achievement) {
		throw new NotFoundError("Achievement not found");
	}

	return achievement;
};

export const deleteAchievementService = async (id: number) => {
	const deleted = await deleteAchievementByIdQuery(id);

	if (!deleted) {
		throw new NotFoundError("Achievement not found");
	}

	return true;
};

export const awardAchievementService = async (userId: number, achievement_id: number) => {
	await awardAchievementToUserQuery(userId, achievement_id);
};

export const getUserAchievementsService = async (userId: number) => {
	return await findUserAchievementsQuery(userId);
};
