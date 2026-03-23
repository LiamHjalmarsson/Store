import { setupDatabase } from "./setupDatabase.js";

async function run() {
	try {
		await setupDatabase();

		process.exit(0);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Database setup failed:", error);

		process.exit(1);
	}
}

run();
