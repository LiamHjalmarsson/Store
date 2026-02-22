import { query } from "../../../config/database.js";
import { Product } from "../../../types/products.js";

export async function allProductsModel() {
	const result = await query<Product>(`
        SELECT * 
        FROM products 
        ORDER BY created_at DESC`);

	return result.rows;
}
