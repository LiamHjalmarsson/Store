<script setup lang="ts">
const links = [
	{
		label: "Marketplace",
		href: "/marketplace",
		icon: "",
	},
	{
		label: "Bank",
		href: "/bank",
		icon: "",
	},
];
</script>

<template>
	<nav class="bg-black text-white w-full fixed flex justify-between items-center px-20">
		<div>MophyPlace</div>
		<ul class="space-x-12 py-6 flex">
			<li v-for="link in links" :key="link.label" class="font-bold capitalize">
				<RouterLink class="" :to="link.href">
					{{ link.label }}
				</RouterLink>
			</li>
		</ul>
	</nav>

	<main class="">
		<RouterView />
	</main>
</template>
