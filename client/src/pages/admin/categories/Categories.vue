<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getCategories, type Category } from "../../../api/category/category";
import Card from "../../../components/ui/Card.vue";

const categories = ref<Category[]>([]);

onMounted(async () => {
	const res = await getCategories();

	categories.value = res.data.categories;

	console.log(categories.value);
});
</script>

<template>
	<div class="container mx-auto">
		<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
			<Card v-for="category in categories" :key="category.id" class="p-1.5 space-y-8 shadow rounded-4xl">
				<template #heading>
					<div>
						<span class="block font-medium">
							{{ category.title }}
						</span>
					</div>
					<div class="w-6 h-6 border/5 rounded-full flex justify-center items-center bg-black/5"></div>
				</template>
			</Card>
		</div>
	</div>
</template>
