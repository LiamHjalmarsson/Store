import { findAllSubcategories } from "../model/subcategoryModel.js";

export async function getAllSubcategoriesService() {
	return await findAllSubcategories();
}
