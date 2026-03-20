import { capitalize } from "../utils/capitalize";
import { pluralize } from "../utils/pluralize";

export function migrationTemplate(name: string) {
	const cap = capitalize(name);
	const table = pluralize(name);

	return `import { query } from "../../config/database.js";

export async function create${cap}Table() {
	await query(\`
		CREATE TABLE IF NOT EXISTS ${table} (
			id SERIAL PRIMARY KEY,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	\`);
}
`;
}
