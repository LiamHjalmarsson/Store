import { query } from "../../config/database.js";

export async function ensureProductsTable() {
	await query(`CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
        subcategory_id INTEGER NOT NULL REFERENCES subcategories(id) ON DELETE RESTRICT,
        creator_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        image_url TEXT,
        file_url TEXT,
        file_size BIGINT,
        is_featured BOOLEAN DEFAULT FALSE,
        is_discounted BOOLEAN DEFAULT FALSE,
        discounted DECIMAL(10, 2) NOT NULL,
        status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published_at TIMESTAMP
    );`);
}
