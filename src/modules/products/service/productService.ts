import { allProductsModel } from "../model/productModel.js";

export async function getAllProductsService() {
	return await allProductsModel();
}
