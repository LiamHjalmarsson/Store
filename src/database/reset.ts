/* eslint-disable no-console */
import { query } from "../config/database.js";
import { setupDatabase } from "./setupDatabase.js";

export async function resetDatabase() {
	console.log("Resetting database...");

	await query(`
			DO $$ DECLARE
				r RECORD;
			BEGIN
				FOR r IN (
					SELECT tablename 
					FROM pg_tables 
					WHERE schemaname = 'public'
				) LOOP
					EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
				END LOOP;
			END $$;
		`);

	console.log("All tables dropped");

	await setupDatabase();

	console.log("Database reset complete");
}

async function run() {
	try {
		await resetDatabase();

		process.exit(0);
	} catch (error) {
		console.error("Reset failed:", error);

		process.exit(1);
	}
}

run();
