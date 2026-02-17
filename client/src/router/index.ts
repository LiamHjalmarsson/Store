import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Index.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";

const routes = [
	{
		path: "/login",
		component: Login,
		name: "login",
	},
	{
		path: "/register",
		component: Register,
		name: "register",
	},
	{
		path: "/forgot-password",
		component: ForgotPassword,
		name: "forgot-password",
	},

	{
		path: "/",
		name: "home",
		component: Home,
	},

	adminRoutes,

	userRoutes,

	{
		path: "/:pathMatch(.*)*",
		name: "not-found",
		component: () => import("../pages/error/NotFound.vue"),
	},
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
