import ForgotPassword from "./pages/ForgotPassword.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";

const authRoutes = [
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
];

export default authRoutes;
