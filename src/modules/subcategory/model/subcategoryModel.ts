import { query } from "../../../config/database.js";
import { CreateSubcategoryPayload, Subcategory, UpdateSubcategoryPayload } from "../types/subcategory.js";

export const findAllSubcategories = async (id?: number) => {
	if (id) {
		const result = await query<Subcategory>(
			`SELECT * 
                                FROM subcategories 
                        WHERE 
                                category_id = $1 
                        ORDER BY 
                                created_at DESC`,
			[id],
		);

		return result.rows;
	}

	const result = await query<Subcategory>(`
        SELECT * 
                FROM subcategories 
        ORDER BY 
                created_at DESC`);

	return result.rows;
};

export const createNewSubcategory = async (payload: CreateSubcategoryPayload) => {
	const result = await query<Subcategory>(
		`INSERT INTO subcategories 
                        (title, category_id, description)
                VALUES 
                        ($1, $2, $3)
                RETURNING *`,
		[payload.title, payload.category_id, payload.description ?? null],
	);

	return result.rows[0];
};

export const findSubcategoryById = async (id: number) => {
	const result = await query<Subcategory>(
		`
		SELECT * 
		FROM subcategories 
		WHERE id = $1`,
		[id],
	);

	return result.rows[0] ?? null;
};

export const updateSubcategoryById = async (id: number, payload: UpdateSubcategoryPayload) => {
	const allowed: (keyof UpdateSubcategoryPayload)[] = ["title", "description", "category_id"];

	const fields = allowed.filter((k) => payload[k] !== undefined);

	if (fields.length === 0) return null;

	const setSql = fields.map((k, i) => `${k} = $${i + 2}`).join(", ");

	const values = [id, ...fields.map((k) => payload[k] ?? null)];

	const result = await query<Subcategory>(
		`
		UPDATE subcategories 
		SET ${setSql}
		WHERE id = $1 RETURNING *`,
		values,
	);

	return result.rows[0] ?? null;
};
