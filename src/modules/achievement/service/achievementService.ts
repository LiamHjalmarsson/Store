import {
	awardAchievementToUser,
	createNewAchievement,
	deleteAchievementById,
	findAllAchievements,
	findUserAchievements,
	updateAchievementById,
} from "../model/achievementModel.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export const getAllAchivementsService = async () => {
	return await findAllAchievements();
};

export const createAchievementService = async (payload: CreateAchievementPayload) => {
	return await createNewAchievement(payload);
};
export const updateAchievementService = async (id: number, payload: UpdateAchievementPayload) => {
	return await updateAchievementById(id, payload);
};

export const deleteAchievementService = async (id: number) => {
	return await deleteAchievementById(id);
};

export const awardAchievementService = async (userId: number, achievement_id: number) => {
	await awardAchievementToUser(userId, achievement_id);
};

export const getUserAchievementsService = async (userId: number) => {
	return await findUserAchievements(userId);
};
