import { findAllSubcategories } from "../model/subcategoryModel.js";

export async function getAllSubcategoriesService(id?: number) {
	return await findAllSubcategories(id);
}
