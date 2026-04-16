import type { CreateAchievementPayload, UpdateAchievementPayload } from "../types/achievement.js";

export const ACHIEVEMENT_FIELDS = [
	"name",
	"code",
	"xp_reward",
] as const satisfies readonly (keyof CreateAchievementPayload)[];

export const UPDATE_ACHIEVEMENT_FIELDS = [
	"name",
	"code",
	"xp_reward",
	"description",
	"icon",
] as const satisfies readonly (keyof UpdateAchievementPayload)[];
