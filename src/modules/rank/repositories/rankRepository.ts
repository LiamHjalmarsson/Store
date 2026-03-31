import { query } from "../../../config/database.js";
import { CreateRankPayload, Rank, UpdateRankPayload } from "../types/rank.js";

const RANK = `
	id,
	name,
	min_xp,
	badge_url,
	created_at
`;

const UPDATABLE_RANK_FIELDS = ["name", "min_xp", "badge_url"] as const;

export const findAllRanksQuery = async () => {
	const result = await query<Rank>(`
		SELECT
			${RANK}
		FROM ranks
		ORDER BY min_xp ASC
    `);

	return result.rows;
};

export const createRankQuery = async (payload: CreateRankPayload) => {
	const { name, min_xp, badge_url = null } = payload;

	const result = await query<Rank>(
		`
			INSERT INTO ranks
				(name, min_xp, badge_url)
			VALUES
				($1, $2, $3)
			RETURNING
				${RANK}
		`,
		[name, min_xp, badge_url],
	);

	return result.rows[0];
};

export const findRankByIdQuery = async (id: number) => {
	const result = await query<Rank>(
		`
			SELECT
				${RANK}
			FROM ranks
			WHERE id = $1
		`,
		[id],
	);

	return result.rows[0] ?? null;
};

export const updateRankByIdQuery = async (id: number, payload: UpdateRankPayload) => {
	const fields = UPDATABLE_RANK_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [id, ...fields.map((field) => payload[field] ?? null)];

	const result = await query<Rank>(
		`
			UPDATE ranks
			SET ${setSql}
			WHERE id = $1
			RETURNING
				${RANK}
		`,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteRankByIdQuery = async (id: number) => {
	const result = await query(
		`
			DELETE FROM ranks
			WHERE id = $1
		`,
		[id],
	);

	return result.rowCount === 1;
};

export const resolveRankByXpQuery = async (xp: number) => {
	const result = await query<Rank>(
		`
			SELECT
				${RANK}
			FROM ranks
			WHERE min_xp <= $1
			ORDER BY min_xp DESC
			LIMIT 1
		`,
		[xp],
	);

	return result.rows[0] ?? null;
};
