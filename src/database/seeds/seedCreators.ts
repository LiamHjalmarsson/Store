import { query } from "../../config/database.js";

export async function seedCreators() {
	try {
		const creators = await query(`
			SELECT id FROM users
			WHERE role = 'creator'`);

		for (const user of creators.rows) {
			const totalSales = user.id * 12;

			const totalEarnings = Number((totalSales * 24.5).toFixed(2));

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
				ON CONFLICT (user_id) DO UPDATE SET
					website = EXCLUDED.website,
					bio = EXCLUDED.bio,
					verified_creator = EXCLUDED.verified_creator,
					featured = EXCLUDED.featured,
					total_sales = EXCLUDED.total_sales,
					total_earnings = EXCLUDED.total_earnings,
					stripe_account_id = EXCLUDED.stripe_account_id,
					payout_method = EXCLUDED.payout_method
				RETURNING user_id
				`,
				[
					user.id,
					"https://example.com",
					"Professional marketplace creator",
					true,
					user.id % 2 === 1,
					totalSales,
					totalEarnings,
					user.id % 3 === 0 ? `acct_${user.id}_stripe` : null,
					user.id % 2 === 0 ? "bank" : "stripe",
				],
			);
		}

		console.log("Seeded creators");
	} catch (err) {
		console.error("Error seeding creators:", err);

		process.exit(1);
	}
}
