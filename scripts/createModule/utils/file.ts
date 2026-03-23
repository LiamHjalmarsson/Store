import fs from "node:fs";
import path from "node:path";

/**
 * Ensures the destination folder exists before a generated file is written.
 */
export function ensureDirectoryExists(filePath: string) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

/**
 * Writes a file only if it does not already exist so generation stays non-destructive.
 */
export function writeFileIfNotExists(filePath: string, content: string) {
	ensureDirectoryExists(filePath);

	if (fs.existsSync(filePath)) {
		return false;
	}

	fs.writeFileSync(filePath, content, "utf8");

	return true;
}
