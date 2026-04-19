import { capitalize } from "../utils/capitalize.js";
import { pluralize } from "../utils/pluralize.js";

/**
 * Generates module-owned response and error messages.
 */
export function messagesTemplate(
	name: string,
	capitalizedName = capitalize(name),
	pluralizedCapitalizedName = capitalize(pluralize(name)),
) {
	const constantName = `${name.toUpperCase()}_MESSAGES`;

	return `export const ${constantName} = {
	RETRIEVED_ALL: "${pluralizedCapitalizedName} retrieved successfully",
	CREATED: "${capitalizedName} created successfully",
	RETRIEVED: "${capitalizedName} retrieved successfully",
	UPDATED: "${capitalizedName} updated successfully",
	DELETED: "${capitalizedName} deleted successfully",
	NOT_FOUND: "${capitalizedName} not found",
} as const;
`;
}
