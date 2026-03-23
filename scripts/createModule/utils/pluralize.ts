/**
 * Applies the generator's simple pluralization rules to names and table names.
 */
export function pluralize(value: string) {
	if (value.endsWith("y")) {
		return `${value.slice(0, -1)}ies`;
	}

	if (value.endsWith("s")) {
		return `${value}es`;
	}

	return `${value}s`;
}
