export interface Achievement {
	id: number;
	code: string;
	name: string;
	description: string | null;
	icon: string | null;
	xp_reward: number;
	created_at: Date | string;
}

type AchievementPayloadFields = Omit<Achievement, "id" | "created_at">;

export type CreateAchievementPayload = Pick<AchievementPayloadFields, "code" | "name" | "xp_reward">;

export type UpdateAchievementPayload = Partial<AchievementPayloadFields>;

export interface UserAchievement {
	user_id: number;
	achievement_id: number;
	earned_at: Date | string;
}

export type AwardAchievementPayload = Pick<UserAchievement, "user_id" | "achievement_id">;
