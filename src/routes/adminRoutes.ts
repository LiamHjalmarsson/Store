import { Router } from "express";
import rankAdminRoute from "../modules/rank/routes/admin/rankRoute.js";
import subcategoryAdminRoute from "../modules/subcategory/routes/admin/subcategoryRoute.js";
import userRoute from "../modules/user/routes/userRoute.js";

const rputes = Router();

rputes.use("/ranks", rankAdminRoute);

rputes.use("/subcategories", subcategoryAdminRoute);

rputes.use("/users", userRoute);

export default rputes;
