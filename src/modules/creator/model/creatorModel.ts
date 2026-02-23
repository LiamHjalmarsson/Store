import { query } from "../../../config/database.js";
import { CreateCreatorPayload, PublicCreator, UpdateCreatorPayload } from "../types/creator.js";

export async function findAllCreators(): Promise<PublicCreator[]> {
	const result = await query<PublicCreator>(`
      SELECT
        u.id,
        u.email,
        u.firstname,
        u.lastname,
        u.avatar,
        u.username,
        u.role,
        u.account_status,
        u.signed_to_newsletter,
        u.created_at,

        c.website,
        c.bio,
        c.social_twitter,
        c.social_instagram,
        c.social_youtube,
        c.verified_creator,
        c.featured,
        c.total_sales,
        c.total_earnings,
        c.stripe_account_id,
        c.payout_method

      FROM users u
      INNER JOIN creators c ON c.user_id = u.id
      WHERE u.role = 'creator'
      ORDER BY u.created_at DESC
    `);

	return result.rows;
}

export const createNewCreator = async (payload: CreateCreatorPayload) => {
	await query(
		`
    UPDATE users 
    SET role = 'creator' 
    WHERE id = $1 AND role != 'creator'`,
		[payload.user_id],
	);

	const result = await query<PublicCreator>(
		`
      INSERT INTO creators (
        user_id, website, bio,
        social_twitter, social_instagram, social_youtube,
        verified_creator, featured,
        total_sales, total_earnings,
        stripe_account_id, payout_method
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING 
        user_id,
        website, bio,
        social_twitter, social_instagram, social_youtube,
        verified_creator, featured,
        total_sales, total_earnings, stripe_account_id, payout_method
    `,
		[
			payload.user_id,
			payload.website ?? null,
			payload.bio ?? null,
			payload.social_twitter ?? null,
			payload.social_instagram ?? null,
			payload.social_youtube ?? null,
			false,
			false,
			0,
			0,
			payload.stripe_account_id ?? null,
			payload.payout_method ?? null,
		],
	);

	if (result.rowCount === 0) {
		throw new Error("Failed to create creator profile");
	}

	return await findCreatorById(payload.user_id);
};

export async function findCreatorById(creatorId: number) {
	const result = await query<PublicCreator>(
		`
		SELECT
      u.id,
      u.email,
      u.firstname,
      u.lastname,
      u.avatar,
      u.username,
      u.role,
      u.account_status,
      u.signed_to_newsletter,
      u.created_at,

      c.website,
      c.bio,
      c.social_twitter,
      c.social_instagram,
      c.social_youtube,
      c.verified_creator,
      c.featured,
      c.total_sales,
      c.total_earnings,
      c.stripe_account_id,
      c.payout_method

		FROM users u
		INNER JOIN creators c ON c.user_id = u.id
		WHERE u.id = $1 AND u.role = 'creator'
		`,
		[creatorId],
	);

	return result.rows[0];
}

export const updateCreator = async (creatorId: number, payload: UpdateCreatorPayload) => {
	if (Object.keys(payload).length === 0) {
		return null;
	}

	const setSql = Object.keys(payload)
		.map((key, i) => `${key} = $${i + 2}`)
		.join(", ");

	const values = [creatorId, ...Object.values(payload)];

	const result = await query<PublicCreator>(
		`
      UPDATE creators
      SET ${setSql}, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING *
    `,
		values,
	);

	if (result.rowCount === 0) {
		return null;
	}

	return await findCreatorById(creatorId);
};

export const deleteCreator = async (creatorId: number) => {
	const result = await query(`DELETE FROM creators WHERE user_id = $1`, [creatorId]);

	await query(`UPDATE users SET role = 'user' WHERE id = $1 AND role = 'creator'`, [creatorId]);

	return result.rowCount === 1;
};
