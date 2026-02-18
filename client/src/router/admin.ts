import Admin from "../layouts/admin.vue";
import Categories from "../pages/admin/categories/Categories.vue";
import Dashboard from "../pages/admin/Dashboard.vue";
import Order from "../pages/admin/orders/order/Order.vue";
import Orders from "../pages/admin/orders/Orders.vue";
import Create from "../pages/admin/products/Create.vue";
import Edit from "../pages/admin/products/product/Edit.vue";
import Products from "../pages/admin/products/Products.vue";
import Settings from "../pages/admin/settings/Settings.vue";
import Users from "../pages/admin/users/Users.vue";

export const adminRoutes = {
	path: "/admin",
	component: Admin,
	children: [
		{
			path: "",
			name: "admin",
			component: Dashboard,
		},
		{
			path: "products",
			name: "admin-products",
			component: Products,
		},
		{
			path: "products/new",
			name: "admin-products-new",
			component: Create,
		},
		{
			path: "products/:id/edit",
			name: "admin-products-edit",
			component: Edit,
		},
		{
			path: "categories",
			name: "admin-categories",
			component: Categories,
		},
		{
			path: "orders",
			name: "admin-orders",
			component: Orders,
		},
		{
			path: "orders/:id",
			name: "admin-order",
			component: Order,
		},
		{
			path: "settings",
			name: "admin-settings",
			component: Settings,
		},
		{
			path: "users",
			name: "admin-users",
			component: Users,
		},
	],
};
