import { query } from "../../config/database.js";
import { CreateProductPayload } from "../../shared/types/products.js";
import { ensureProductsTable } from "../migrations/products.js";
import { products } from "./data/products.js";

export async function seedProducts() {
	try {
		await query("DROP TABLE IF EXISTS products CASCADE");

		await ensureProductsTable();

		const subcategories = await query(`SELECT id, title, category_id FROM subcategories LIMIT 20`);

		const subcats = subcategories.rows;

		if (subcats.length === 0) {
			console.log("No subcategories found — skipping product seeding");

			return;
		}

		let insertedCount = 0;

		for (const product of products) {
			const subcat = subcats[insertedCount % subcats.length];

			const payload: CreateProductPayload = {
				...product,
				category_id: subcat.category_id,
				subcategory_id: subcat.id,
				creator_id: Math.random() > 0.5 ? 2 : 3,
				price: product.price ?? 0,
				status: product.status ?? "draft",
			};

			await query(
				`
                INSERT INTO products (
                    title, description, price, category_id, subcategory_id, creator_id, image_url, is_featured, is_discounted, discounted, status
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
					payload.is_featured ?? false,
					payload.is_discounted ?? false,
					payload.discounted ?? 0,
					payload.status,
				],
			);
		}

		console.log(`Successfully seeded ${insertedCount} products`);
	} catch (error) {
		console.error("Error seeding Products items:", error);

		process.exit(1);
	}
}
