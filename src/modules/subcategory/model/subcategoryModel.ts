import { query } from "../../../config/database.js";
import { Subcategory } from "../types/subcategory.js";

export const findAllSubcategories = async () => {
	const result = await query<Subcategory>(`
        SELECT * 
        FROM subcategories 
        ORDER BY created_at DESC`);

	return result.rows;
};
