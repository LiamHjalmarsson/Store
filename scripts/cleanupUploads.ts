import { promises as fs } from "fs";
import path from "path";
import { UPLOAD_ROOT } from "../src/config/storage.js";

async function cleanupFolder(folderPath: string): Promise<void> {
	const entries = await fs.readdir(folderPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(folderPath, entry.name);

		if (entry.isDirectory()) {
			await cleanupFolder(fullPath);

			continue;
		}

		const stats = await fs.stat(fullPath);

		if (stats.size === 0) {
			await fs.unlink(fullPath);

			console.log(`Removed empty file: ${fullPath}`);
		}
	}
}

async function run() {
	try {
		await fs.access(UPLOAD_ROOT);
	} catch {
		// eslint-disable-next-line no-console
		console.log("Upload root does not exist, nothing to clean.");

		return;
	}

	await cleanupFolder(UPLOAD_ROOT);

	// eslint-disable-next-line no-console
	console.log("Cleanup finished.");
}

run().catch((error) => {
	// eslint-disable-next-line no-console
	console.error("Cleanup failed:", error);

	process.exit(1);
});
