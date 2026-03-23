import { query } from "../../config/database.js";

export async function ensureProductsTable() {
	await query(`CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
        subcategory_id INTEGER NOT NULL REFERENCES subcategories(id) ON DELETE RESTRICT,
        creator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        image_url TEXT,
        file_url TEXT,
        file_size BIGINT CHECK (file_size IS NULL OR file_size >= 0),
        is_featured BOOLEAN DEFAULT FALSE,
        is_discounted BOOLEAN DEFAULT FALSE,
        discounted DECIMAL(10, 2) NOT NULL DEFAULT 0 CHECK (discounted >= 0),
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        CHECK (
            (is_discounted = FALSE AND discounted = 0)
            OR (is_discounted = TRUE AND discounted >= 0 AND discounted <= price)
        ),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published_at TIMESTAMP
    );`);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_products_category_id
		ON products(category_id);
	`);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_products_subcategory_id
		ON products(subcategory_id);
	`);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_products_creator_id
		ON products(creator_id);
	`);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_products_status
		ON products(status);
	`);

	await query(`
		CREATE INDEX IF NOT EXISTS idx_products_created_at
		ON products(created_at DESC);
	`);
}
