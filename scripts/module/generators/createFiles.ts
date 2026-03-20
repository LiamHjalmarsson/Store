import path from "node:path";
import { ModuleGeneratorConfig } from "../index.js";
import { writeFileIfNotExists } from "../utils/file.js";
import { controllerTemplate } from "../templates/controllerTemplate.js";
import { serviceTemplate } from "../templates/serviceTemplate.js";
import { repositoryTemplate } from "../templates/repositoryTemplate.js";
import { routesTemplate } from "../templates/routesTemplate.js";
import { typesTemplate } from "../templates/typesTemplate.js";
import { validationCreateTemplate } from "../templates/validationCreateTemplate.js";
import { validationUpdateTemplate } from "../templates/validationUpdateTemplate.js";

export function createModuleFiles(config: ModuleGeneratorConfig) {
	const files = [
		{
			folder: "controller",
			fileName: `${config.moduleNameLower}Controller.ts`,
			content: controllerTemplate(config.moduleNameLower),
		},
		{
			folder: "service",
			fileName: `${config.moduleNameLower}Service.ts`,
			content: serviceTemplate(config.moduleNameLower),
		},
		{
			folder: "repository",
			fileName: `${config.moduleNameLower}Repository.ts`,
			content: repositoryTemplate(config.moduleNameLower),
		},
		{
			folder: "routes",
			fileName: `${config.moduleNameLower}Routes.ts`,
			content: routesTemplate(),
		},
		{
			folder: "types",
			fileName: `${config.moduleNameLower}.types.ts`,
			content: typesTemplate(config.moduleNameLower),
		},
		{
			folder: "validation",
			fileName: `create${config.moduleNameCapitalized}Validation.ts`,
			content: validationCreateTemplate(config.moduleNameLower),
		},
		{
			folder: "validation",
			fileName: `update${config.moduleNameCapitalized}Validation.ts`,
			content: validationUpdateTemplate(config.moduleNameLower),
		},
	];

	for (const file of files) {
		const fullPath = path.join(config.moduleBasePath, file.folder, file.fileName);

		writeFileIfNotExists(fullPath, file.content);
	}
}
