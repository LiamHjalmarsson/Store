import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Index.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";
import Default from "../layouts/default.vue";

const routes = [
	{
		path: "/",
		component: Default,
		children: [
			{
				path: "",
				name: "home",
				component: Home,
			},
		],
	},

	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: ForgotPassword,
	},

	adminRoutes,

	userRoutes,

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
