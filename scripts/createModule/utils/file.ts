import fs from "node:fs";
import path from "node:path";

export function ensureDirectoryExists(filePath: string) {
	fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

export function writeFileIfNotExists(filePath: string, content: string) {
	ensureDirectoryExists(filePath);

	if (fs.existsSync(filePath)) {
		return false;
	}

	fs.writeFileSync(filePath, content, "utf8");

	return true;
}

