import fs from "node:fs";
import path from "node:path";
import { ModuleGeneratorConfig } from "..";
import { seedDataTemplate } from "../templates/seedDataTemplate";

export function createSeedFiles(config: ModuleGeneratorConfig) {
	fs.mkdirSync(config.seedsPath, { recursive: true });

	fs.mkdirSync(config.seedDataPath, { recursive: true });

	const dataPath = path.join(config.seedDataPath, `${config.tableName}.ts`);

	if (!fs.existsSync(dataPath)) {
		fs.writeFileSync(dataPath, seedDataTemplate(config.moduleNameLower), "utf8");
	}
}
