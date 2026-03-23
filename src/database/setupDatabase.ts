/* eslint-disable no-console */
import { ensureUserAchievementsTable } from "./migrations/user_achievements.js";
import { ensureUserTable } from "./migrations/users.js";
import { ensureSubcategoryTable } from "./migrations/subcategories.js";
import { ensureRanksTable } from "./migrations/ranks.js";
import { ensureProductsTable } from "./migrations/products.js";
import { ensureCreatorsTable } from "./migrations/creators.js";
import { ensureCategoryTable } from "./migrations/categories.js";
import { ensureAchievementsTable } from "./migrations/achievements.js";
import { ensureDatabaseExists } from "./ensureDatabase.js";

export async function setupDatabase() {
	await ensureDatabaseExists();

	await ensureUserTable();

	await ensureRanksTable();

	await ensureCategoryTable();

	await ensureSubcategoryTable();

	await ensureCreatorsTable();

	await ensureAchievementsTable();

	await ensureProductsTable();

	await ensureUserAchievementsTable();

	console.log("Database and tables are ready");
}
