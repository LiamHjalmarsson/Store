import {
	awardAchievementToUser,
	createAchievement,
	deleteAchievementById,
	getAllAchievements,
	getUserAchievements,
	updateAchievementById,
} from "../model/achievementModel.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export async function getAchivementsService() {
	return await getAllAchievements();
}

export async function createAchievementService(payload: CreateAchievementPayload) {
	return await createAchievement(payload);
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
