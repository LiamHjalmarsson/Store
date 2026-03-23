import { capitalize } from "../utils/capitalize.js";
import { pluralize } from "../utils/pluralize.js";

/**
 * Generates a repository with placeholder query functions to fill in later.
 */
export function repositoryTemplate(
	name: string,
	capitalizedName = capitalize(name),
	pluralizedCapitalizedName = capitalize(pluralize(name)),
) {
	const cap = capitalizedName;

	const pluralCap = pluralizedCapitalizedName;

	return `import { query } from "../../../config/database.js";
import { Create${cap}Payload, Update${cap}Payload } from "../types/${name}.js";

export const find${pluralCap}Query = async () => {
	void query;

	return [];
};

export const create${cap}Query = async (payload: Create${cap}Payload) => {
	void payload;

	return null;
};

export const find${cap}ByIdQuery = async (${name}Id: number) => {
	void ${name}Id;

	return null;
};

export const update${cap}ByIdQuery = async (${name}Id: number, payload: Update${cap}Payload) => {
	void ${name}Id;
	void payload;

	return null;
};

export const delete${cap}ByIdQuery = async (${name}Id: number) => {
	void ${name}Id;

	return null;
};
`;
}

