import type { Achievement } from "./achievement.js";

export interface AchievementResponseData {
	achievement: Achievement;
}

export interface AchievementsResponseData {
	achievements: Achievement[];
}

export interface DeleteAchievementResponseData {
	deleted: boolean;
}

export interface AwardAchievementResponseData {
	awarded: boolean;
}
