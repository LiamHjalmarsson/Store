import { capitalize } from "../utils/capitalize.js";
import { pluralize } from "../utils/pluralize.js";

/**
 * Generates a service with basic not-found handling around repository calls.
 */
export function serviceTemplate(
	name: string,
	capitalizedName = capitalize(name),
	pluralizedCapitalizedName = capitalize(pluralize(name)),
) {
	const cap = capitalizedName;

	const pluralCap = pluralizedCapitalizedName;

	return `import { NotFoundError } from "../../../shared/errors/notFound.js";
import {
	create${cap}Query,
	delete${cap}ByIdQuery,
	find${pluralCap}Query,
	find${cap}ByIdQuery,
	update${cap}ByIdQuery,
} from "../repository/${name}Repository.js";
import { Create${cap}Payload, Update${cap}Payload } from "../types/${name}.js";

export const getAll${pluralize(cap)}Service = async () => {
	return await find${pluralCap}Query();
};

export const create${cap}Service = async (payload: Create${cap}Payload) => {
	return await create${cap}Query(payload);
};

export const get${cap}Service = async (${name}Id: number) => {
	const ${name} = await find${cap}ByIdQuery(${name}Id);

	if (!${name}) {
		throw new NotFoundError("${cap} not found");
	}

	return ${name};
};

export const update${cap}Service = async (${name}Id: number, payload: Update${cap}Payload) => {
	const ${name} = await update${cap}ByIdQuery(${name}Id, payload);

	if (!${name}) {
		throw new NotFoundError("${cap} not found");
	}

	return ${name};
};

export const delete${cap}Service = async (${name}Id: number) => {
	const ${name} = await delete${cap}ByIdQuery(${name}Id);

	if (!${name}) {
		throw new NotFoundError("${cap} not found");
	}

	return true;
};
`;
}

