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
	description?: string | null;
	icon?: string | null;
	xp_reward: number;
}

export type UpdateAchievementPayload = Partial<CreateAchievementPayload>;

export interface AwardAchievementPayload {
	achievement_id: number;
}

export interface AwardAchievementResult {
	awarded: boolean;
}

