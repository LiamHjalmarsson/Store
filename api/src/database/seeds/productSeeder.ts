import { query } from "../../config/database.js";
import { ensureProductTable } from "../migrations/products.js";

export async function seedProducts() {
	try {
		await query("DROP TABLE IF EXISTS products CASCADE");

		await ensureProductTable();

		const products = [
			{
				title: "iPhone 15",
				description: "Latest Apple smartphone",
				price: 1299.99,
				stock: 50,
				image: "iphone.jpg",
				category_id: 1,
			},
			{
				title: "Book: Clean Code",
				description: "Programming best practices",
				price: 39.99,
				stock: 200,
				image: "cleancode.jpg",
				category_id: 2,
			},
			{
				title: "T-shirt",
				description: "Cotton, size M",
				price: 19.99,
				stock: 100,
				image: "tshirt.jpg",
				category_id: 3,
			},
		];

		for (const product of products) {
			await query(
				`INSERT INTO products (title, description, price, stock, image, category_id)
                 VALUES ($1,$2,$3,$4,$5,$6)
                 ON CONFLICT (title) DO NOTHING`,
				[product.title, product.description, product.price, product.stock, product.image, product.category_id]
			);

			console.log(`Seeded product: ${product.title}`);
		}
	} catch (err) {
		console.error("Error seeding products:", err);

		process.exit(1);
	}
}
