export interface Achievement {
	id: number;
	code: string;
	name: string;
	description: string | null;
	icon: string | null;
	xp_reward: number;
	created_at: Date | string;
}

export interface CreateAchievementPayload {
	code: string;
	name: string;
	xp_reward: number;
	description?: string | null;
	icon?: string | null;
}

export type UpdateAchievementPayload = Partial<CreateAchievementPayload>;

export interface AwardAchievementPayload {
	user_id: number;
	achievement_id: number;
}

export interface AwardAchievementResult {
	awarded: boolean;
}
