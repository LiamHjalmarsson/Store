import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Index.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ForgotPassword from "../pages/auth/ForgotPassword.vue";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import Categories from "../pages/shop/Categories.vue";
import Category from "../pages/shop/Category.vue";
import Creators from "../pages/creators/Creators.vue";
import Creator from "../pages/creators/Creator.vue";

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
				path: "/marketplace",
				name: "marketplace",
				component: Home,
			},
			{
				path: "/categories",
				name: "categories",
				component: Categories,
			},
			{
				path: "/categories/:id",
				name: "category",
				component: Category,
			},
			{
				path: "/creators/",
				name: "creators",
				component: Creators,
			},
			{
				path: "/creators/:id",
				name: "creator",
				component: Creator,
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
