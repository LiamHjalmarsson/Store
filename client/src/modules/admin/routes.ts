import AdminLayout from "@/layouts/AdminLayout.vue";
import Users from "./pages/Users.vue";
import Categories from "./pages/Categories.vue";
import Dashboard from "./pages/Dashboard.vue";

const adminRoutes = [
	{
		path: "/admin",
		component: AdminLayout,
		children: [
			{
				path: "",
				name: "admin",
				component: Dashboard,
			},
			{
				path: "categories",
				name: "admin-categories",
				component: Categories,
			},
			{
				path: "users",
				name: "admin-users",
				component: Users,
			},
		],
	},
];

export default adminRoutes;
