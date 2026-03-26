export interface Achievement {
	id: number;
	code: string;
	name: string;
	description: string | null;
	icon: string | null;
	xp_reward: number;
	created_at: Date | string;
}

export interface UserAchievement {
	user_id: number;
	achievement_id: number;
	earned_at: Date;
}
