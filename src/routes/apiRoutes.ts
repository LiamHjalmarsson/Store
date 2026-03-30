import { Router } from "express";
import achievementRoute from "../modules/achievement/routes/achievementRoute.js";
import authRoute from "../modules/auth/routes/authRoute.js";
import categoryRoute from "../modules/category/routes/categoryRoute.js";
import creatorRoute from "../modules/creator/routes/creatorRoute.js";
import productRoute from "../modules/product/routes/productRoute.js";
import profileRoute from "../modules/profile/routes/profileRoute.js";
import rankRoute from "../modules/rank/routes/rankRoute.js";
import subcategoryRoute from "../modules/subcategory/routes/subcategoryRoute.js";

const routes = Router();

routes.use("/auth", authRoute);

routes.use("/creators", creatorRoute);

routes.use("/profile", profileRoute);

routes.use("/achievements", achievementRoute);

routes.use("/products", productRoute);

routes.use("/categories", categoryRoute);

routes.use("/subcategories", subcategoryRoute);

routes.use("/ranks", rankRoute);

export default routes;

