import { query } from "../../../config/database.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { CreateCreatorPayload, PublicCreator, UpdateCreatorPayload } from "../types/creator.js";

const creatorProfileSelect = `
	u.id,
	u.email,
	u.firstname,
	u.lastname,
	u.avatar,
	u.username,
	u.role,
	u.account_status,
	u.signed_to_newsletter,
	c.website,
	c.bio,
	c.verified_creator,
	c.featured,
	c.total_sales,
	c.total_earnings,
	c.payout_method,
	c.created_at,
	c.updated_at
`;

export const findAllCreators = async (pagination: PaginationQuery) => {
	const totalResult = await query<{ count: string }>(
		`
		SELECT COUNT(*)::text AS count
		FROM users u
		INNER JOIN creators c ON c.user_id = u.id
		WHERE u.role = 'creator'
	`,
	);

	const total = Number(totalResult.rows[0].count);

	const result = await query<PublicCreator>(
		`
		SELECT
			${creatorProfileSelect}
		FROM users u
		INNER JOIN creators c ON c.user_id = u.id
		WHERE u.role = 'creator'
		ORDER BY c.created_at DESC
		LIMIT $1
		OFFSET $2
	`,
		[pagination.limit, pagination.offset],
	);

	const totalPages = Math.ceil(total / pagination.limit);

	return {
		items: result.rows,
		total,
		page: pagination.page,
		limit: pagination.limit,
		totalPages,
	};
};

export const createNewCreator = async (payload: CreateCreatorPayload): Promise<PublicCreator> => {
	const { user_id, website = null, bio = null, stripe_account_id = null, payout_method = null } = payload;

	await query(
		`
			UPDATE users
			SET role = 'creator'
			WHERE id = $1
		`,
		[user_id],
	);

	await query(
		`
			INSERT INTO creators (
				user_id,
				website,
				bio,
				verified_creator,
				featured,
				total_sales,
				total_earnings,
				stripe_account_id,
				payout_method
			)
			VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		`,
		[user_id, website, bio, false, false, 0, 0, stripe_account_id, payout_method],
	);

	const creator = await findCreatorById(user_id);

	if (!creator) {
		throw new BadRequestError("Creator could not be created");
	}

	return creator;
};

export const findCreatorById = async (creatorId: number) => {
	const result = await query<PublicCreator>(
		`
		SELECT
			${creatorProfileSelect}
		FROM users u
		INNER JOIN creators c ON c.user_id = u.id
		WHERE u.id = $1
			AND u.role = 'creator'
	`,
		[creatorId],
	);

	return result.rows[0];
};

export const updateCreatorById = async (creatorId: number, payload: UpdateCreatorPayload) => {
	const allowedFields = [
		"website",
		"bio",
		"verified_creator",
		"featured",
		"stripe_account_id",
		"payout_method",
	] as const;

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 2}`).join(", ");
	const values = [creatorId, ...fields.map((key) => payload[key] ?? null)];

	const result = await query(
		`
			UPDATE creators
			SET ${setSql},
				updated_at = CURRENT_TIMESTAMP
			WHERE user_id = $1
			RETURNING user_id
		`,
		values,
	);

	if (result.rowCount === 0) {
		return null;
	}

	return await findCreatorById(creatorId);
};

export const deleteCreatorById = async (creatorId: number) => {
	const result = await query(
		`
			DELETE FROM creators
			WHERE user_id = $1
			RETURNING user_id
		`,
		[creatorId],
	);

	await query(
		`
			UPDATE users
			SET role = 'user'
			WHERE id = $1
		`,
		[creatorId],
	);

	return result.rowCount === 1;
};

