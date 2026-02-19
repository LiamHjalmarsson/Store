<script setup lang="ts">
import Icon from "../components/ui/Icon.vue";

import { UserIcon } from "@hugeicons/core-free-icons";

const links = [
	{
		label: "Marketplace",
		href: "/marketplace",
		icon: null,
	},
	{
		label: "Bank",
		href: "/bank",
		icon: null,
	},
];

const linksAccount = [
	{
		label: "Bank",
		href: "/login",
		icon: UserIcon,
	},
];
</script>

<template>
	<nav class="bg-black text-white w-full fixed flex justify-between items-center px-20 z-50">
		<div>MophyPlace</div>
		<ul class="space-x-12 py-6 flex items-center">
			<li v-for="link in links" :key="link.label" class="font-bold capitalize">
				<RouterLink class="flex gap-3 items-center justify-center" :to="link.href">
					{{ link.label }}
					<Icon v-if="link.icon" :icon="link.icon" :size="24" />
				</RouterLink>
			</li>
		</ul>
		<ul>
			<li v-for="link in linksAccount" :key="link.label" class="font-bold capitalize">
				<RouterLink class="flex gap-3 items-center justify-center px-6" :to="link.href">
					<Icon v-if="link.icon" :icon="link.icon" :size="24" />
				</RouterLink>
			</li>
		</ul>
	</nav>

	<main class="">
		<RouterView />
	</main>
</template>
