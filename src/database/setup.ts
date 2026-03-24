/* eslint-disable no-console */
import { setupDatabase } from "./setupDatabase.js";

async function run() {
	try {
		console.log("Setting up database...");

		await setupDatabase();

		console.log("database setup finished");

		process.exit(0);
	} catch (error) {
		console.error("Database setup failed:", error);

		process.exit(1);
	}
}

run();
