import { capitalize } from "../utils/capitalize";
import { pluralize } from "../utils/pluralize";

export function serviceTemplate(name: string) {
	const cap = capitalize(name);

	return `export const getAll${pluralize(cap)}Service = async () => {};

export const create${cap}Service = async () => {};

export const get${cap}Service = async () => {};

export const update${cap}Service = async () => {};

export const delete${cap}Service = async () => {};
`;
}
