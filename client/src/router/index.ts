import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Index.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import authRoutes from "../modules/auth/routes";
import categoryRoutes from "../modules/categories/routes";
import adminRoutes from "@/modules/admin/routes";

const routes = [
	{
		path: "/",
		component: DefaultLayout,
		children: [
			{
				path: "",
				name: "home",
				component: Home,
			},
			{
				path: "marketplace",
				name: "marketplace",
				component: Home,
			},
			...categoryRoutes,
		],
	},

	...authRoutes,

	...adminRoutes,

	{
		path: "/:pathMatch(.*)*",
		name: "not-found",
		component: () => import("../pages/error/NotFound.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export { router };
