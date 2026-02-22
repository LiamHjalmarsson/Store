export interface Achievement {
	id: number;
	code: string;
	name: string;
	description: string | null;
	icon_url: string | null;
	xp_reward: number;
	created_at: Date;
}

export interface UserAchievement {
	user_id: number;
	achievement_id: number;
	earned_at: Date;
}

export interface CreateAchievementPayload {
	code: string;
	name: string;
	description: string | null;
	icon_url: string | null;
	xp_reward: number;
}
