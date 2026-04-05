import { Router } from "express";
import categoryAdminRoute from "../modules/category/routes/admin/categoryRoute.js";
import creatorAdminRoute from "../modules/creator/routes/admin/creatorRoute.js";
import rankAdminRoute from "../modules/rank/routes/admin/rankRoute.js";
import subcategoryAdminRoute from "../modules/subcategory/routes/admin/subcategoryRoute.js";
import userRoute from "../modules/user/routes/userRoute.js";

const rputes = Router();

rputes.use("/categories", categoryAdminRoute);

rputes.use("/creators", creatorAdminRoute);

rputes.use("/ranks", rankAdminRoute);

rputes.use("/subcategories", subcategoryAdminRoute);

rputes.use("/users", userRoute);

export default rputes;
