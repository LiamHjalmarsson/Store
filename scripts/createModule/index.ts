/* eslint-disable no-console */
import path from "node:path";
import { capitalize } from "./utils/capitalize.js";
import { pluralize } from "./utils/pluralize.js";
import { createFolders } from "./generators/createFolders.js";
import { createModuleFiles } from "./generators/createFiles.js";
import { createMigrationFile } from "./generators/createMigrations.js";

export interface ModuleGeneratorConfig {
	moduleNameLower: string;
	moduleNameCapitalized: string;
	tableName: string;
	tableNameCapitalized: string;
	rootPath: string;
	moduleBasePath: string;
	migrationsPath: string;
	folders: string[];
}

function run() {
	const config = getModuleConfig(process.argv[2]);

	const createdFolders = createFolders(config);
	const createdFiles = createModuleFiles(config);
	const createdMigration = createMigrationFile(config);

	console.log(`Module "${config.moduleNameLower}" processed.`);

	if (createdFolders.length > 0) {
		console.log("Created folders:");

		for (const folder of createdFolders) {
			console.log(`  - ${folder}`);
		}
	}

	if (createdFiles.length > 0) {
		console.log("Created files:");

		for (const file of createdFiles) {
			console.log(`  - ${file}`);
		}
	}

	if (createdMigration) {
		console.log(`Created migration: ${createdMigration}`);
	}

	if (createdFolders.length === 0 && createdFiles.length === 0 && !createdMigration) {
		console.log("No files were created because the scaffold already exists.");
	}
}

function getModuleConfig(moduleName?: string) {
	if (!moduleName) {
		console.error("Please provide a module name.");

		console.log("Example: npm run module -- product");

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

run();

