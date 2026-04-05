import { query } from "../../../config/database.js";
import { BadRequestError } from "../../../shared/errors/badRequest.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { UPDATABLE_CREATOR_FIELDS } from "../constants/creatorField.js";
import { CreateCreatorPayload, PublicCreator, UpdateCreatorPayload } from "../types/creator.js";

const CREATOR_PROFILE = `
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

export const findAllCreatorsQuery = async (pagination: PaginationQuery) => {
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
			${CREATOR_PROFILE}
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

export const createCreatorQuery = async (payload: CreateCreatorPayload) => {
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

	const creator = await findCreatorByIdQuery(user_id);

	if (!creator) {
		throw new BadRequestError("Creator could not be created");
	}

	return creator;
};

export const findCreatorByIdQuery = async (creatorId: number) => {
	const result = await query<PublicCreator>(
		`
		SELECT
			${CREATOR_PROFILE}
		FROM users u
		INNER JOIN creators c ON c.user_id = u.id
		WHERE u.id = $1
			AND u.role = 'creator'
	`,
		[creatorId],
	);

	return result.rows[0];
};

export const updateCreatorByIdQuery = async (creatorId: number, payload: UpdateCreatorPayload) => {
	const fields = UPDATABLE_CREATOR_FIELDS.filter((field) => payload[field] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((field, index) => `${field} = $${index + 2}`).join(", ");

	const values = [creatorId, ...fields.map((field) => payload[field] ?? null)];

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

	return findCreatorByIdQuery(creatorId);
};

export const deleteCreatorByIdQuery = async (creatorId: number) => {
	const result = await query(
		`
				DELETE FROM creators
				WHERE user_id = $1
				RETURNING user_id
			`,
		[creatorId],
	);

	if (result.rowCount !== 1) {
		return false;
	}

	await query(
		`
				UPDATE users
				SET role = 'user'
				WHERE id = $1
			`,
		[creatorId],
	);

	return true;
};
