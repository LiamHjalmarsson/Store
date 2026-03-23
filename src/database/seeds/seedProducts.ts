/* eslint-disable no-console */
import { query } from "../../config/database.js";
import { CreateProductPayload } from "../../modules/product/types/product.js";
import { products } from "./data/products.js";

export async function seedProducts() {
	try {
		const subcategories = await query(`SELECT id, title, category_id FROM subcategories LIMIT 20`);

		const creators = await query(`SELECT user_id FROM creators ORDER BY user_id ASC`);

		const subcats = subcategories.rows;

		const creatorIds = creators.rows.map((creator) => creator.user_id);

		if (subcats.length === 0) {
			console.log("No subcategories found - skipping product seeding");

			return;
		}

		if (creatorIds.length === 0) {
			console.log("No creators found - skipping product seeding");

			return;
		}

		let insertedCount = 0;

		for (const product of products) {
			insertedCount++;

			const subcat = subcats[(insertedCount - 1) % subcats.length];

			const payload: CreateProductPayload = {
				...product,
				category_id: subcat.category_id,
				subcategory_id: subcat.id,
				creator_id: creatorIds[(insertedCount - 1) % creatorIds.length],
				price: product.price ?? 0,
				file_url: product.file_url ?? null,
				file_size: product.file_size ?? null,
				status: product.status ?? "draft",
			};

			await query(
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
                VALUES 
					($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                ON CONFLICT DO NOTHING
            `,
				[
					payload.title,
					payload.description ?? null,
					payload.price,
					payload.category_id,
					payload.subcategory_id,
					payload.creator_id ?? null,
					payload.image_url ?? null,
					payload.file_url ?? null,
					payload.file_size ?? null,
					payload.is_featured ?? false,
					payload.is_discounted ?? false,
					payload.discounted ?? 0,
					payload.status ?? "draft",
				],
			);
		}

		console.log(`Successfully seeded ${insertedCount} products`);
	} catch (error) {
		console.error("Error seeding products:", error);

		process.exit(1);
	}
}

