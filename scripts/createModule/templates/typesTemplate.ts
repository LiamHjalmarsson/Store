/**
 * Generates base entity and payload types for a new module.
 */
export function typesTemplate(capitalizedName: string) {
	return `export interface ${capitalizedName} {
	id: number;
	created_at: string;
	updated_at: string;
}

export interface Create${capitalizedName}Payload {}

export interface Update${capitalizedName}Payload extends Partial<Create${capitalizedName}Payload> {}
`;
}
