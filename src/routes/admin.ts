import { Router } from "express";

import userRoute from "../modules/user/routes/userRoute.js";
import categoryAdminRoute from "../modules/category/routes/admin/categoryRoute.js";
import subcategoryAdminRoute from "../modules/subcategory/routes/admin/subcategoryRoute.js";
import achievementAdminRoutes from "../modules/achievement/routes/admin/achievementRoutes.js";
import creatorRouteAdmin from "../modules/creator/routes/admin/creatorRoute.js";

const admin = Router();

admin.use("/users", userRoute);
admin.use("/categories", categoryAdminRoute);
admin.use("/subcategories", subcategoryAdminRoute);
admin.use("/achievements", achievementAdminRoutes);
admin.use("/creators", creatorRouteAdmin);

export default admin;
