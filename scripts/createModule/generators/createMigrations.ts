import path from "node:path";
import fs from "node:fs";
import { ModuleGeneratorConfig } from "..";
import { migrationTemplate } from "../templates/migrationTemplate";

export function createMigrationFile(config: ModuleGeneratorConfig) {
	fs.mkdirSync(config.migrationsPath, { recursive: true });

	const filePath = path.join(config.migrationsPath, `${config.tableName}.ts`);

	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, migrationTemplate(config.moduleNameLower), "utf8");
	}
}
