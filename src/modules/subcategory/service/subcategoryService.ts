import { createNewSubcategory, findAllSubcategories, findSubcategoryById } from "../model/subcategoryModel.js";

export async function getAllSubcategoriesService(id?: number) {
	return await findAllSubcategories(id);
}

export async function createSubcategoryService(payload: CreateSubcategoryPayload) {
	return await createNewSubcategory(payload);
}

export async function getSubcategoryService(id: number) {
	return await findSubcategoryById(id);
}
