import { allSubcategories } from "../model/subcategory.js";

export async function getAllSubcategoriesService() {
	return await allSubcategories();
}
