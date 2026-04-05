import { Router } from "express";
import productRoute from "../modules/product/routes/productRoute.js";
import profileRoute from "../modules/profile/routes/profileRoute.js";
import rankRoute from "../modules/rank/routes/rankRoute.js";
import subcategoryRoute from "../modules/subcategory/routes/subcategoryRoute.js";

const routes = Router();

routes.use("/profile", profileRoute);

routes.use("/products", productRoute);

routes.use("/subcategories", subcategoryRoute);

routes.use("/ranks", rankRoute);

export default routes;
