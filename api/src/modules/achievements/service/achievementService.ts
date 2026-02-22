import { awardAchievement, getAllAchievements, createAchievement } from "../model/achievementModel.js";
import { CreateAchievementPayload } from "../types/achievementTypes.js";

export async function getAchievementsService() {
	return await getAllAchievements();
}

export const createAchievementService = async (data: CreateAchievementPayload) => {
	return await createAchievement(data);
};

export async function awardAchievementService(userId: number, achievementId: number) {
	await awardAchievement(userId, achievementId);
}
