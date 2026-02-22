import { allSubcategories } from "../model/productModel.js";

export async function getAllSubcategoriesService() {
	return await allSubcategories();
}
