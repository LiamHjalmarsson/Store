import Categories from "@/modules/categories/pages/Categories.vue";
import AdminLayout from "../layouts/AdminLayout.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Users from "@/modules/users/pages/admin/Users.vue";

export const adminRoutes = {
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
};
