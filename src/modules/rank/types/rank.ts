export interface Rank {
	id: number;
	name: string;
	min_xp: number;
	badge_url: string | null;
	created_at: Date | string;
}

export interface CreateRankPayload {
	name: string;
	min_xp: number;
	badge_url?: string | null;
}

export type UpdateRankPayload = Partial<CreateRankPayload>;

export interface RankParams {
	id: string;
}

export interface ResolveRankQuery {
	xp?: string;
}
