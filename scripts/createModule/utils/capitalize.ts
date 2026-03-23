/**
 * Uppercases the first character for generated type and function names.
 */
export function capitalize(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}
