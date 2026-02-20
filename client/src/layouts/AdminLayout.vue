<script setup lang="ts">
import Sidebar from "../components/layout/Sidebar.vue";

const links = [
	{
		label: "Dashboard",
		href: "/admin",
		icon: "",
		subLinks: [],
	},
	{
		label: "Users",
		href: "/admin/users",
		icon: "",
		subLinks: [],
	},
	{
		label: "Categories",
		href: "categories",
		icon: "",
		subLinks: [],
	},
	{
		label: "Orders",
		href: "orders",
		icon: "",
		subLinks: [],
	},
	{
		label: "Payments",
		href: "payments",
		icon: "",
		subLinks: [],
	},
	{
		label: "Products",
		href: "products",
		icon: "",
		subLinks: [
			{
				label: "Create",
				href: "create",
				icon: "",
			},
		],
	},
	{
		label: "Settings",
		href: "settings",
		icon: "",
		subLinks: [],
	},
];
</script>

<template>
	<Sidebar :links />

	<main class="ml-64 flex-1 p-8">
		<RouterView />
	</main>
</template>
