<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "../../store/category";
import CategoryCard from "./CategoryCard.vue";

const categoryStore = useCategoryStore();

const { fetchCategories } = categoryStore;

const { categories } = storeToRefs(categoryStore);

onMounted(async () => {
	await fetchCategories();
});
</script>

<template>
	<section class="relative">
		<div class="container mx-auto relative z-10 space-y-3">
			<div class="grid grid-cols-1 lg:grid-cols-3 row-span-2 gap-3">
				<CategoryCard
					v-for="(category, index) in categories.slice(0, 3)"
					:key="category.id"
					:category
					:class="[
						'min-h-86',
						index === 0
							? 'bg-linear-to-br from-purple-600 to-pink-600 row-span-2 col-span-2 text-7xl'
							: ' text-4xl',
					]" />
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
				<CategoryCard
					v-for="category in categories.slice(3)"
					:key="category.id"
					:category
					:class="['rounded-2xl relative overflow-hidden shadow-xl min-h-64 text-3xl']" />
			</div>
		</div>
	</section>
</template>
