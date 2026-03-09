<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "../store/category";

const route = useRoute();

const categoryStore = useCategoryStore();

const { category } = storeToRefs(categoryStore);

const { fetchCategory } = categoryStore;

const slug = computed(() => String(route.params.slug));

onMounted(async () => {
	await fetchCategory(slug.value);
});

watch(
	() => route.params.slug,
	async (newSlug) => {
		if (!newSlug) return;

		await fetchCategory(String(newSlug));
	},
);
</script>

<template>
	<div class="pt-48 px-20">
		<div class="space-y-6">
			<h1 class="text-3xl font-bold">{{ category?.title }}</h1>
			<p v-if="category?.description">{{ category?.description }}</p>
			<img :src="category?.image" :alt="category?.title" class="w-full max-w-3xl rounded-2xl object-cover" />
		</div>
	</div>
</template>
