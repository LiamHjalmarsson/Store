import { query } from "../../config/database.js";

export async function ensureUserTable() {
	await query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            firstname TEXT,
            lastname TEXT,
            avatar TEXT,
            bio TEXT,
            role TEXT CHECK (role IN ('user','admin', 'creator')) DEFAULT 'user',
            account_status TEXT CHECK (account_status IN ('active','suspended','banned')) DEFAULT 'active',
            signed_to_newsletter BOOLEAN DEFAULT false,
            last_login TIMESTAMP,
            created_at TIMESTAMP DEFAULT now(),
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
}
