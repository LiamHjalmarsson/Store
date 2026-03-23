import path from "node:path";
import fs from "node:fs";
import type { ModuleGeneratorConfig } from "../index.js";
import { migrationTemplate } from "../templates/migrationTemplate.js";

export function createMigrationFile(config: ModuleGeneratorConfig) {
	fs.mkdirSync(config.migrationsPath, { recursive: true });

	const filePath = path.join(config.migrationsPath, `${config.tableName}.ts`);

	if (fs.existsSync(filePath)) {
		return null;
	}

	fs.writeFileSync(filePath, migrationTemplate(config.moduleNameLower), "utf8");

	return filePath;
}
