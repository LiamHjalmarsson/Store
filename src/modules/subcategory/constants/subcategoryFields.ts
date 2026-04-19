import { Subcategory } from "../types/subcategory.js";

export const SUBCATEGORY_FIELDS = ["title", "description", "category_id"] as const satisfies (keyof Subcategory)[];

