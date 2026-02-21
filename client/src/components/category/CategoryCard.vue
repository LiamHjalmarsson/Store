<script setup lang="ts">
import type { Category } from "../../types/category";

defineProps<{ category: Category }>();
</script>

<template>
	<div class="rounded-2xl relative overflow-hidden shadow-xl">
		<div class="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />

		<div class="relative h-full w-full">
			<img :src="category.image" :alt="category.title" class="absolute w-full h-full object-cover opacity-85" />
		</div>

		<div class="absolute bottom-0 flex flex-col justify-between px-6 py-8 z-20">
			<h1 class="font-extrabold text-white">
				{{ category.title }}
			</h1>
		</div>
	</div>
</template>
