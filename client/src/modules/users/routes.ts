import UserLayout from "@/layouts/UserLayout.vue";

const userRoutes = [
	{
		path: "/profile",
		component: UserLayout,
		children: [
			{
				path: "",
				name: "profile",
				// component: Profile,
			},
		],
	},
];

export default userRoutes;
