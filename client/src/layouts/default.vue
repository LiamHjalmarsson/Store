<script setup lang="ts">
const links = [
	{
		label: "Images",
		href: "/images",
		icon: "",
	},
	{
		label: "Men",
		href: "/illustrations",
		icon: "",
	},
];
</script>

<template>
	<nav class="bg-black text-white w-full flex-1 fixed">
		<ul class="space-y-12 py-10 px-20">
			<li v-for="link in links" :key="link.label" class="font-bold text-lg capitalize">
				<RouterLink class="" :to="link.href">
					{{ link.label }}
				</RouterLink>
			</li>
		</ul>
	</nav>
</template>
