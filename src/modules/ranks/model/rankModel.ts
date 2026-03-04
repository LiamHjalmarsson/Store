import { query } from "../../../config/database.js";
import { CreateRankPayload, Rank, UpdateRankPayload } from "../types/rank.js";

export const findAllRanks = async () => {
	const result = await query<Rank>(`
        SELECT
            id, name, min_xp, badge_url, created_at
        FROM ranks
    `);

	return result.rows;
};

export const createNewRank = async (payload: CreateRankPayload) => {
	const { name, min_xp, badge_url = null } = payload;

	const result = await query<Rank>(
		`
        INSER INTO ranks
            (name, min_xp, badge_url)
        VALUES
            ($1, $2, $3)
        RETURNING *
    `,
		[name, min_xp, badge_url],
	);

	return result.rows[0];
};

export const findRankById = async (id: number) => {
	const result = await query<Rank>(
		`
        SELECT 
            id, name, min_xp, badge_url, created_at
        FROM ranks
        WHERE id = $1`,
		[id],
	);

	return result.rows[0] || null;
};

export const updateRankById = async (id: number, payload: UpdateRankPayload) => {
	const allowedFields: (keyof UpdateRankPayload)[] = ["name", "min_xp", "badge_url"];

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, index) => `${key} = $${index + 2}`).join(", ");

	const values = [id, ...fields.map((key) => payload[key] ?? null)];

	const result = await query<Rank>(
		`
        UPDATE ranks
        SET ${setSql}
        WHERE id = $1
        RETURNING *
    `,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteRankById = async (id: number) => {
	const result = await query<Rank>(
		`
        DELETE FROM ranks
        WHERE id = $1    
    `,
		[id],
	);

	return result.rows[0] ?? null;
};

export const resolveRankByXp = async (xp: number) => {
	const result = await query<Rank>(
		`SELECT 
            id, name, min_xp, badge_url, created_at
		 FROM 
            ranks
		 WHERE 
            min_xp <= $1
		 ORDER BY 
            min_xp DESC
		 LIMIT 1`,
		[xp],
	);

	return result.rows[0] ?? null;
};
