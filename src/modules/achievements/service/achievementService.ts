import {
	awardAchievementToUser,
	createNewAchievement,
	deleteAchievementById,
	findAllAchievements,
	getUserAchievements,
	updateAchievementById,
} from "../model/achievementModel.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export async function getAllAchivementsService() {
	return await findAllAchievements();
}

export async function createAchievementService(payload: CreateAchievementPayload) {
	return await createNewAchievement(payload);
}
export async function updateAchievementService(id: number, payload: UpdateAchievementPayload) {
	return await updateAchievementById(id, payload);
}

export async function deleteAchievementService(id: number) {
	return await deleteAchievementById(id);
}

export async function awardAchievementService(userId: number, achievement_id: number) {
	await awardAchievementToUser(userId, achievement_id);
}

export async function getUserAchievementsService(userId: number) {
	return await getUserAchievements(userId);
}
