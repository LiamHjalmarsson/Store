import { Achievement } from "./achievement.js";

export interface AchievementResponse {
	achievement: Achievement;
}

export interface AchievementsResponse {
	achievements: Achievement[];
}

export interface AwardAchievementResponse {
	awarded: boolean;
}
