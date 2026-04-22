import { Router } from "express";
import rankAdminRoute from "../modules/rank/routes/admin/rankRoute.js";
import subcategoryAdminRoute from "../modules/subcategory/routes/admin/subcategoryRoute.js";
import userRoute from "../modules/user/routes/userRoute.js";

const routes = Router();

routes.use("/ranks", rankAdminRoute);

routes.use("/subcategories", subcategoryAdminRoute);

routes.use("/users", userRoute);

export default routes;
