import { capitalize } from "../utils/capitalize.js";
import { pluralize } from "../utils/pluralize.js";

/**
 * Generates a basic migration for the module's table.
 */
export function migrationTemplate(name: string) {
	const cap = capitalize(name);
	const table = pluralize(name);

	return `import { query } from "../../config/database.js";

export async function create${cap}Table() {
	await query(\`
		CREATE TABLE IF NOT EXISTS ${table} (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP DEFAULT NOW(),
			updated_at TIMESTAMP DEFAULT NOW()
		)
	\`);
}
`;
}

