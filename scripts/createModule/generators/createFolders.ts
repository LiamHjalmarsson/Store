import fs from "node:fs";
import path from "node:path";
import type { ModuleGeneratorConfig } from "../index.js";

export function createFolders(config: ModuleGeneratorConfig) {
	const createdFolders: string[] = [];

	for (const folder of config.folders) {
		const folderPath = path.join(config.moduleBasePath, folder);

		if (!fs.existsSync(folderPath)) {
			createdFolders.push(folderPath);
		}

		fs.mkdirSync(folderPath, { recursive: true });
	}

	return createdFolders;
}
