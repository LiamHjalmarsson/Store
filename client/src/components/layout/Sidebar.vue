<script setup lang="ts">
import type { Link } from "../../types/shared";

defineProps<{ links: Link[] }>();
</script>

<template>
	<nav class="bg-black/80 w-fit flex-1 fixed h-full">
		<ul class="space-y-12 py-10 px-20">
			<li v-for="link in links" :key="link.label" class="font-bold text-lg text-white capitalize">
				<RouterLink class="" :to="{ name: link.name }">
					{{ link.label }}
				</RouterLink>
			</li>
		</ul>
	</nav>
</template>
