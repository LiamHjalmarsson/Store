import fs from "node:fs";
import path from "node:path";
import { ModuleGeneratorConfig } from "../index.js";

export function createFolders(config: ModuleGeneratorConfig) {
	for (const folder of config.folders) {
		fs.mkdirSync(path.join(config.moduleBasePath, folder), { recursive: true });
	}
}
