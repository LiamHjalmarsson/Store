import { capitalize } from "../utils/capitalize";
import { pluralize } from "../utils/pluralize";

export function repositoryTemplate(name: string) {
	const cap = capitalize(name);

	return `export const find${pluralize(cap)}Query = async () => {};

export const create${cap}Query = async () => {};

export const find${cap}ByIdQuery = async () => {};

export const update${cap}ByIdQuery = async () => {};

export const delete${cap}ByIdQuery = async () => {};
`;
}
