import { query } from "../../../config/database.js";
import { Subcategory } from "../types/subcategory.js";

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
