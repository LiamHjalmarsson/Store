import { query } from "../../../config/database.js";
import { PublicUser } from "../../../shared/types/user.js";

export async function findAllCreators(): Promise<PublicUser[]> {
	const result = await query<PublicUser>(`
    SELECT
      id,
      email,
      firstname,
      lastname,
      avatar,
      username,
      role,
      account_status,
      signed_to_newsletter,
      created_at
    FROM users
    WHERE role = 'creator'
    ORDER BY created_at DESC
  `);

	return result.rows;
}

export async function findCreatorById(id: number): Promise<PublicUser | null> {
	const result = await query<PublicUser>(
		`
    SELECT   
      id,
      email,
      firstname,
      lastname,
      avatar,
      username,
      role,
      account_status,
      signed_to_newsletter,
      created_at FROM users WHERE id = $1 AND role = 'creator'`,
		[id],
	);

	return result.rows[0] ?? null;
}
