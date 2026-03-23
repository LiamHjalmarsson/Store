import path from "node:path";
import type { ModuleGeneratorConfig } from "../index.js";
import { writeFileIfNotExists } from "../utils/file.js";
import { controllerTemplate } from "../templates/controllerTemplate.js";
import { serviceTemplate } from "../templates/serviceTemplate.js";
import { repositoryTemplate } from "../templates/repositoryTemplate.js";
import { routesTemplate } from "../templates/routesTemplate.js";
import { typesTemplate } from "../templates/typesTemplate.js";
import { validationCreateTemplate } from "../templates/validationCreateTemplate.js";
import { validationUpdateTemplate } from "../templates/validationUpdateTemplate.js";

/**
 * Creates files using the naming conventions already used in `src/modules`.
 */
export function createModuleFiles(config: ModuleGeneratorConfig) {
	const createdFiles: string[] = [];

	const files = [
		{
			folder: "controller",
			fileName: `${config.moduleNameLower}Controller.ts`,
			content: controllerTemplate(
				config.moduleNameLower,
				config.moduleNameCapitalized,
				config.tableNameCapitalized,
			),
		},
		{
			folder: "service",
			fileName: `${config.moduleNameLower}Service.ts`,
			content: serviceTemplate(config.moduleNameLower, config.moduleNameCapitalized, config.tableNameCapitalized),
		},
		{
			folder: "repository",
			fileName: `${config.moduleNameLower}Repository.ts`,
			content: repositoryTemplate(
				config.moduleNameLower,
				config.moduleNameCapitalized,
				config.tableNameCapitalized,
			),
		},
		{
			folder: "routes",
			fileName: `${config.moduleNameLower}Route.ts`,
			content: routesTemplate(config.moduleNameLower, config.moduleNameCapitalized, config.tableNameCapitalized),
		},
		{
			folder: "types",
			fileName: `${config.moduleNameLower}.ts`,
			content: typesTemplate(config.moduleNameCapitalized),
		},
		{
			folder: "validation",
			fileName: "createValidation.ts",
			content: validationCreateTemplate(config.moduleNameCapitalized),
		},
		{
			folder: "validation",
			fileName: "updateValidation.ts",
			content: validationUpdateTemplate(config.moduleNameCapitalized),
		},
	];

	for (const file of files) {
		const fullPath = path.join(config.moduleBasePath, file.folder, file.fileName);

		if (writeFileIfNotExists(fullPath, file.content)) {
			createdFiles.push(fullPath);
		}
	}

	return createdFiles;
}

