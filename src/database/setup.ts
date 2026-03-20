import { ensureUserAchievementsTable } from "./migrations/user_achievements.js";
import { ensureDatabaseExists } from "./enusreDatabase.js";
import { ensureUserTable } from "./migrations/users.js";
import { ensureSubcategoryTable } from "./migrations/subcategories.js";
import { ensureRanksTable } from "./migrations/ranks.js";
import { ensureProductsTable } from "./migrations/products.js";
import { ensureCreatorsTable } from "./migrations/creators.js";
import { ensureCategoryTable } from "./migrations/categories.js";
import { ensureAchievementsTable } from "./migrations/achievements.js";

export async function setupDatabase() {
	try {
		await ensureDatabaseExists();

		await ensureUserTable();

		await ensureUserAchievementsTable();

		await ensureSubcategoryTable();

		await ensureRanksTable();

		await ensureProductsTable();

		await ensureCreatorsTable();

		await ensureCategoryTable();

		await ensureAchievementsTable();

		console.log("Database and tables are ready");

		process.exit(0);
	} catch (error) {
		console.error("Database setup failed:", error);

		process.exit(1);
	}
}

setupDatabase();
