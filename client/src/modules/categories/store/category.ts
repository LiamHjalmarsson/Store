import { defineStore } from "pinia";
import type { Category } from "../types/category";
import { ref } from "vue";
import { getCategories, getCategoryBySlug } from "../services/category";

export const useCategoryStore = defineStore("category", () => {
	const categories = ref<Category[]>([]);

	const category = ref<Category>();

	async function fetchCategories() {
		try {
			const { data } = await getCategories();

			categories.value = data.categories;
		} catch (error) {
			console.log(error);
		}
	}

	async function fetchCategory(slug: string) {
		try {
			const { data } = await getCategoryBySlug(slug);

			category.value = data.category;
		} catch (error) {
			console.log(error);
		}
	}

	return {
		categories,
		category,

		fetchCategories,
		fetchCategory,
	};
});
