export interface Rank {
	id: number;
	name: string;
	min_xp: number;
	badge_url: string;
	created_at: Date | string;
}

export interface CreateRankPayload {
	name: string;
	min_xp: number;
	badge_url?: string | null;
}

export interface UpdateRankPayload extends Partial<CreateRankPayload> {}
