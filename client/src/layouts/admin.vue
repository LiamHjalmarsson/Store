<script setup lang="ts">
const links = [
	{
		label: "Users",
		href: "users",
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
	<nav class="bg-indigo-600 w-fit flex-1 fixed h-full">
		<ul class="space-y-12 py-10 px-20">
			<li v-for="link in links" :key="link.label" class="font-bold text-lg text-white capitalize">
				<RouterLink class="" :to="link.href">
					{{ link.label }}
				</RouterLink>
			</li>
		</ul>
	</nav>

	<main class="ml-64 flex-1 p-8">
		<RouterView />
	</main>
</template>
