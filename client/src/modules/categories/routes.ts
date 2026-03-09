import Categories from "./pages/Categories.vue";
import Category from "./pages/Category.vue";

const categoryRoutes = [
	{
		path: "/categories",
		name: "categories",
		component: Categories,
	},
	{
		path: "/categories/:slug",
		name: "category",
		component: Category,
	},
];

export default categoryRoutes;
