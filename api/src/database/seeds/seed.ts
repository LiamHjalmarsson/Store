import { seedCategories } from "./seedCategory.js";
import { seedUsers } from "./seedUser.js";
import { seedRanks } from "./seedRanks.js";
import { seedAchievements } from "./seedAchivements.js";
import { seedUserAchievements } from "./seedUserAchievements.js";
import { seedCreators } from "./seedCreators.js";

export async function seed() {
	try {
		await seedUsers();

		await seedCategories();

		await seedRanks();

		await seedAchievements();

		await seedUserAchievements();

		await seedCreators();

		console.log("Seed completed");

		process.exit(0);
	} catch (error) {
		console.error("Seed failed:", error);

		process.exit(1);
	}
}

seed();
