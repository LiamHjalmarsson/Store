import { query } from "../../../config/database.js";
import { PaginationQuery } from "../../../shared/types/pagination.js";
import { CreateProductPayload, Product, UpdateProductPayload } from "../types/product.js";

export const findAllProducts = async (pagination: PaginationQuery) => {
	const totalResult = await query<{ count: string }>(`
        SELECT COUNT(*)::text AS count
        FROM products
    `);

	const total = Number(totalResult.rows[0].count);

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

export const createNewProduct = async (creatorId: number, payload: CreateProductPayload) => {
	const result = await query<Product>(
		`
			INSERT INTO products
			(
				title, description, price, category_id, subcategory_id, creator_id, image_url, file_url, file_size, is_featured, is_discounted, discounted, status
			)
			VALUES 
				($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
			RETURNING
				*
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
			false,
			false,
			0,
			payload.status ?? "published",
		],
	);

	return result.rows[0];
};

export const findProductById = async (id: number) => {
	const result = await query<Product>(
		`
			SELECT * 
			FROM products
			WHERE id = $1
        `,
		[id],
	);

	return result.rows[0];
};

export const updateProductById = async (id: number, creatorId: number, payload: UpdateProductPayload) => {
	const allowedFields: (keyof UpdateProductPayload)[] = [
		"title",
		"description",
		"price",
		"category_id",
		"subcategory_id",
		"image_url",
		"file_url",
		"file_size",
		"is_featured",
		"is_discounted",
		"discounted",
		"status",
	];

	const fields = allowedFields.filter((key) => payload[key] !== undefined);

	if (fields.length === 0) {
		return null;
	}

	const setSql = fields.map((key, i) => `${key} = $${i + 3}`).join(", ");

	const values = [id, creatorId, ...fields.map((key) => payload[key] ?? null)];

	const result = await query<Product>(
		`
      UPDATE products
      SET ${setSql}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND creator_id = $2
      RETURNING *
    `,
		values,
	);

	return result.rows[0] ?? null;
};

export const deleteProductById = async (id: number, creatorId: number) => {
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
