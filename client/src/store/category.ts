import { defineStore } from "pinia";
import type { Category } from "../types/category";
import { ref } from "vue";
import { getCategories } from "../api/category/category";

export const useCategoryStore = defineStore("category", () => {
	const categories = ref<Category[]>([]);

	async function fetchCategories() {
		try {
			const { data } = await getCategories();

			console.log(data.categories);

			categories.value = data.categories;
		} catch (error) {}
	}

	return {
		categories,
		fetchCategories,
	};
});
