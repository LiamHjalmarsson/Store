export interface CreateAchievementPayload {
	code: string;
	name: string;
	description: string | null;
	icon: string | null;
	xp_reward: number;
}

export type UpdateAchievementPayload = Partial<CreateAchievementPayload>;
