import { seedCategories } from "./seedCategories.js";
import { seedUsers } from "./seedUsers.js";
import { seedRanks } from "./seedRanks.js";
import { seedAchievements } from "./seedAchivements.js";
import { seedUserAchievements } from "./seedUserAchievements.js";
import { seedCreators } from "./seedCreators.js";
import { seedSubcategories } from "./seedSubcategories.js";
import { seedProducts } from "./seedProducts.js";

export async function seed() {
	try {
		await seedUsers();

		await seedCategories();

		await seedSubcategories();

		await seedRanks();

		await seedAchievements();

		await seedUserAchievements();

		await seedCreators();

		await seedProducts();

		console.log("Seed completed");

		process.exit(0);
	} catch (error) {
		console.error("Seed failed:", error);

		process.exit(1);
	}
}

seed();
