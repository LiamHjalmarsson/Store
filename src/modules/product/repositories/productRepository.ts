import { query } from "../../../config/database.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { UPDATABLE_PRODUCT_FIELDS } from "../constants/productFields.js";
import { CreateProductPayload, Product, UpdateProductPayload } from "../types/product.js";

export const findProductsQuery = async (pagination: PaginationQuery) => {
	const totalResult = await query<{ count: number }>(`
		SELECT COUNT(*)::int AS count
        FROM products
    `);

	const total = totalResult.rows[0].count;

	const result = await query<Product>(
		`
        SELECT *
        FROM products
        ORDER BY created_at DESC
        LIMIT $1
        OFFSET $2
        `,
		[pagination.limit, pagination.offset],
	);

	const totalPages = Math.ceil(total / pagination.limit);

	return {
		items: result.rows,
		total,
		page: pagination.page,
		limit: pagination.limit,
		totalPages,
	};
};

export const createProductQuery = async (creatorId: number, payload: CreateProductPayload) => {
	const result = await query<Product>(
		`
			INSERT INTO products (
				title, 
				description, 
				price, 
				category_id, 
				subcategory_id, 
				creator_id, 
				image_url, 
				file_url, 
				file_size, 
				is_featured, 
				is_discounted, 
				discounted, 
				status
			)
			VALUES (
				$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
			)
			RETURNING *
        `,
		[
			payload.title,
			payload.description ?? null,
			payload.price,
			payload.category_id,
			payload.subcategory_id,
			creatorId ?? null,
			payload.image_url ?? null,
			payload.file_url ?? null,
			payload.file_size ?? null,
			payload.is_featured ?? false,
			payload.is_discounted ?? false,
			payload.discounted ?? 0,
			payload.status ?? "published",
		],
	);

	return result.rows[0] ?? null;
};

export const findProductByIdQuery = async (id: number) => {
	const result = await query<Product>(
		`
			SELECT * 
			FROM products
			WHERE id = $1
        `,
		[id],
	);

	return result.rows[0] ?? null;
};

export const updateProductByIdQuery = async (id: number, creatorId: number, payload: UpdateProductPayload) => {
	const fieldsToUpdate = UPDATABLE_PRODUCT_FIELDS.filter((fieldName) => payload[fieldName] !== undefined);

	if (fieldsToUpdate.length === 0) {
		return null;
	}

	const setSql = fieldsToUpdate.map((fieldName, i) => `${fieldName} = $${i + 3}`).join(", ");

	const values = [id, creatorId, ...fieldsToUpdate.map((fieldName) => payload[fieldName] ?? null)];

	const updatedProduct = await query<Product>(
		`
			UPDATE products
			SET ${setSql}, updated_at = CURRENT_TIMESTAMP
			WHERE id = $1 AND creator_id = $2
			RETURNING *
		`,
		values,
	);

	return updatedProduct.rows[0] ?? null;
};

export const deleteProductByIdQuery = async (id: number, creatorId: number) => {
	const result = await query(
		`
			DELETE FROM products
			WHERE id = $1 AND creator_id = $2
			RETURNING id
		`,
		[id, creatorId],
	);

	return result.rowCount === 1;
};

export const findProductByIdForCreatorQuery = async (id: number, creatorId: number) => {
	const result = await query<Product>(
		`
			SELECT *
			FROM products
			WHERE id = $1 AND creator_id = $2
			LIMIT 1
		`,
		[id, creatorId],
	);

	return result.rows[0] ?? null;
};

export async function userOwnsProductQuery(userId: number, productId: number) {
	const result = await query(
		`
			SELECT 1
			FROM order_items order_item
			INNER JOIN orders customer_order
				ON customer_order.id = order_item.order_id
			WHERE customer_order.user_id = $1
			AND order_item.product_id = $2
			AND customer_order.status = 'paid'
			LIMIT 1
		`,
		[userId, productId],
	);

	return (result.rowCount ?? 0) > 0;
}
