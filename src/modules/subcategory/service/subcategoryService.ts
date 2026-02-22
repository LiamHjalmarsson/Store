import { allSubcategories } from "../model/subcategoryModel.js";

export async function getAllSubcategoriesService() {
	return await allSubcategories();
}
