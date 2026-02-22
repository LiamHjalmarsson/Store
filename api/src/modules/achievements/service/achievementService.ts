import {
	awardAchievement,
	createAchievement,
	deleteAchievement,
	getAllAchievements,
	getUserAchievements,
	updateAchievement,
} from "../model/achievementModel.js";
import { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievementTypes.js";

export async function getAchievementsService() {
	return await getAllAchievements();
}

export async function createAchievementService(payload: CreateAchievementPayload) {
	return await createAchievement(payload);
}
export async function updateAchievementService(id: number, payload: UpdateAchievementPayload) {
	return await updateAchievement(id, payload);
}

export async function deleteAchievementService(id: number) {
	return await deleteAchievement(id);
}

export async function awardAchievementService(userId: number, achievement_id: number) {
	await awardAchievement(userId, achievement_id);
}

export async function getUserAchievementsService(userId: number) {
	return await getUserAchievements(userId);
}
