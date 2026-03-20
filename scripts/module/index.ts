import path from "node:path";
import { capitalize } from "./utils/capitalize";
import { pluralize } from "./utils/pluralize";
import { createFolders } from "./generators/createFolders";
import { createModuleFiles } from "./generators/createFiles";
import { createMigrationFile } from "./generators/createMigrations";

/* eslint-disable no-console */

export interface ModuleGeneratorConfig {
	moduleNameLower: string;
	moduleNameCapitalized: string;
	tableName: string;
	tableNameCapitalized: string;
	rootPath: string;
	moduleBasePath: string;
	migrationsPath: string;
	seedsPath: string;
	seedDataPath: string;
	folders: string[];
}

const config = getModuleConfig(process.argv[2]);

createFolders(config);

createModuleFiles(config);

createMigrationFile(config);

function getModuleConfig(moduleName?: string): ModuleGeneratorConfig {
	if (!moduleName) {
		console.error("Please provide a module name.");

		console.log("Example: npm run create -- product");

		process.exit(1);
	}

	const moduleNameLower = moduleName.toLowerCase();

	const moduleNameCapitalized = capitalize(moduleNameLower);

	const tableName = pluralize(moduleNameLower);

	const tableNameCapitalized = capitalize(tableName);

	const rootPath = process.cwd();

	return {
		moduleNameLower,
		moduleNameCapitalized,
		tableName,
		tableNameCapitalized,
		rootPath,
		moduleBasePath: path.join(rootPath, "src", "modules", moduleNameLower),
		migrationsPath: path.join(rootPath, "src", "database", "migrations"),
		seedsPath: path.join(rootPath, "src", "database", "seeds"),
		seedDataPath: path.join(rootPath, "src", "database", "seeds", "data"),
		folders: [
			"controller",
			"service",
			"repository",
			"routes",
			"middleware",
			"types",
			"validation",
			"validation/fields",
			"validation/rules",
		],
	};
}

console.log(`Module "${config.moduleNameLower}" generated successfully.`);
