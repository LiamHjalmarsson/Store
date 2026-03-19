/* eslint-disable no-console */
import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
	console.error("❌ Please provide a module name");

	console.log("Example: npm run generate:module product");

	process.exit(1);
}

const basePath = path.join(process.cwd(), "src/modules", moduleName);

const structure = [
	"controller",
	"service",
	"repository",
	"routes",
	"middleware",
	"validation",
	"validation/rules",
	"validation/fields",
	"types",
];

const files = [
	{
		folder: "controller",
		name: `${moduleName}Controller.ts`,
		type: "controller",
	},
	{
		folder: "service",
		name: `${moduleName}Service.ts`,
		type: "service",
	},
	{
		folder: "repository",
		name: `${moduleName}Repository.ts`,
		type: "repository",
	},
	{
		folder: "routes",
		name: `${moduleName}Routes.ts`,
		type: "routes",
	},
	{
		folder: "types",
		name: `${moduleName}.types.ts`,
		type: "types",
	},
	{
		folder: "validation",
		name: `create${capitalize(moduleName)}Validation.ts`,
		type: "validationCreate",
	},
	{
		folder: "validation",
		name: `update${capitalize(moduleName)}Validation.ts`,
		type: "validationUpdate",
	},
];

for (const dir of structure) {
	fs.mkdirSync(path.join(basePath, dir), { recursive: true });
}

for (const file of files) {
	const filePath = path.join(basePath, file.folder, file.name);

	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, getTemplate(file.type, moduleName));
	}
}

console.log(`✅ Module "${moduleName}" created successfully at ${basePath}`);

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTemplate(type: string, name: string) {
	const cap = capitalize(name);

	switch (type) {
		case "controller":
			return ``;

		case "service":
			return ``;

		case "repository":
			return ``;

		case "routes":
			return ``;

		case "types":
			return ``;

		case "validationCreate":
			return ``;

		case "validationUpdate":
			return ``;

		default:
			return `// ${name}`;
	}
}
