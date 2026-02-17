import Dashboard from "../pages/profile/Dashboard.vue";
import Order from "../pages/profile/Order.vue";
import Orders from "../pages/profile/Orders.vue";
import Profile from "../pages/profile/Profile.vue";
import Wishlist from "../pages/profile/Wishlist.vue";

export const userRoutes = {
	path: "/user",
	children: [
		{
			path: "",
			name: "dashboard",
			component: Dashboard,
		},
		{
			path: "orders",
			name: "dashboard-orders",
			component: Orders,
		},
		{
			path: "orders/:id",
			name: "dashboard-order-detail",
			component: Order,
		},
		{
			path: "profile",
			name: "dashboard-profile",
			component: Profile,
		},
		{
			path: "wishlist",
			name: "dashboard-wishlist",
			component: Wishlist,
		},
	],
};
