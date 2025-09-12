import { seedCategories } from "./seedCategory.js";
import { seedUsers } from "./seedUser.js";

export async function seed() {
	try {
		await seedUsers();

		await seedCategories();

		console.log("Seed completed");

		process.exit(0);
	} catch (error) {
		console.error("Seed failed:", error);

		process.exit(1);
	}
}

seed();
