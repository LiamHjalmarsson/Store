import { query } from "../../config/database.js";

export async function ensureCreatorsTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS creators (
            user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
            website TEXT,
            bio TEXT,

            stripe_account_id VARCHAR(100) UNIQUE,
            payout_method VARCHAR(20) CHECK (payout_method IN ('stripe', 'bank', 'other') OR payout_method IS NULL),

            verified_creator BOOLEAN DEFAULT FALSE,
            featured BOOLEAN DEFAULT FALSE,

            total_sales BIGINT DEFAULT 0,
            total_earnings DECIMAL(12,2) DEFAULT 0.00,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_creators_user_id
		ON creators(user_id);
	`);
}
