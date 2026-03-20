import { capitalize } from "../utils/capitalize";

export function typesTemplate(name: string) {
	const cap = capitalize(name);

	return `export interface ${cap} {
	id: number;
}
`;
}
