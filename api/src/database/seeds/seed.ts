import { seedProducts } from "./seedProduct.js";
import { seedCategories } from "./seedCategory.js";
import { seedUsers } from "./seedUser.js";
import { seedOrders } from "./seedOrders.js";
import { seedOrderItems } from "./seedOrderItems.js";
import { seedCarts } from "./seedCarts.js";
import { seedCartItems } from "./seedCartItems.js";
import { seedPayments } from "./seedPayments.js";
import { seedRanks } from "./seedRanks.js";
import { seedAchievements } from "./seedAchivements.js";

export async function seed() {
	try {
		await seedUsers();

		await seedCategories();

		await seedProducts();

		await seedOrders();

		await seedOrderItems();

		await seedCarts();

		await seedCartItems();

		await seedPayments();

		await seedRanks();

		await seedAchievements();

		console.log("Seed completed");

		process.exit(0);
	} catch (error) {
		console.error("Seed failed:", error);

		process.exit(1);
	}
}

seed();
