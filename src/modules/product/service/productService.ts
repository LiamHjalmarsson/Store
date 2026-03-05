import {
	createNewProduct,
	deleteProductById,
	findAllProducts,
	findProductById,
	updateProductById,
} from "../model/productModel.js";
import { CreateProductPayload, GetProductsQuery, UpdateProductPayload } from "../types/product.js";

export const getAllProductsService = async (query: GetProductsQuery) => {
	return await findAllProducts(query);
};

export const createProductService = async (id: number, payload: CreateProductPayload) => {
	return await createNewProduct(id, payload);
};

export const getProductService = async (id: number) => {
	return await findProductById(id);
};

export const updateProductService = async (id: number, creatorId: number, payload: UpdateProductPayload) => {
	return await updateProductById(id, creatorId, payload);
};

export const deleteProductService = async (id: number, creatorId: number) => {
	return await deleteProductById(id, creatorId);
};
