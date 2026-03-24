import { ensureDatabaseExists } from "./ensureDatabase.js";
import { achievementsTable } from "./migrations/achievements.js";
import { categoriesTable } from "./migrations/categories.js";
import { creatorsTable } from "./migrations/creators.js";
import { productsTable } from "./migrations/products.js";
import { ranksTable } from "./migrations/ranks.js";
import { subcategoriesTable } from "./migrations/subcategories.js";
import { userAchievementsTable } from "./migrations/user_achievements.js";
import { usersTable } from "./migrations/users.js";

export async function setupDatabase() {
	await ensureDatabaseExists();

	await usersTable();

	await ranksTable();

	await categoriesTable();

	await subcategoriesTable();

	await creatorsTable();

	await achievementsTable();

	await productsTable();

	await userAchievementsTable();
}
