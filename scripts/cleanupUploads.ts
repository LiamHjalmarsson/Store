/* eslint-disable no-console */
import { promises as fs } from "node:fs";
import path from "node:path";
import { UPLOAD_ROOT } from "../src/config/storage.js";

interface CleanupSummary {
	removedFiles: number;
	removedDirectories: number;
}

/**
 * Removes zero-byte files and removes directories that become empty.
 */
async function cleanupFolder(folderPath: string) {
	const summary: CleanupSummary = {
		removedFiles: 0,
		removedDirectories: 0,
	};

	const entries = await fs.readdir(folderPath, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(folderPath, entry.name);

		if (entry.isDirectory()) {
			const nestedSummary = await cleanupFolder(fullPath);

			summary.removedFiles += nestedSummary.removedFiles;

			summary.removedDirectories += nestedSummary.removedDirectories;

			const remainingEntries = await fs.readdir(fullPath);

			if (remainingEntries.length === 0) {
				await fs.rmdir(fullPath);

				summary.removedDirectories += 1;

				console.log(`Removed empty directory: ${fullPath}`);
			}

			continue;
		}

		const stats = await fs.stat(fullPath);

		if (stats.size === 0) {
			await fs.unlink(fullPath);

			summary.removedFiles += 1;

			console.log(`Removed empty file: ${fullPath}`);
		}
	}

	return summary;
}

/**
 * Runs cleanup against the configured upload root.
 */
async function run() {
	try {
		await fs.access(UPLOAD_ROOT);
	} catch {
		console.log("Upload root does not exist, nothing to clean.");

		return;
	}

	const summary = await cleanupFolder(UPLOAD_ROOT);

	console.log(
		`Cleanup finished. Removed ${summary.removedFiles} empty files and ${summary.removedDirectories} empty directories.`,
	);
}

run().catch((error) => {
	console.error("Cleanup failed:", error);

	process.exit(1);
});

