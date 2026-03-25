import express from "express";
import cors from "cors";
import authRoute from "./modules/auth/routes/authRoute.js";
import creatorRoute from "./modules/creator/routes/creatorRoute.js";
import profileRoute from "./modules/profile/routes/profileRoute.js";
import achievementRoutes from "./modules/achievement/routes/achievementRoute.js";
import categoryRoute from "./modules/category/routes/categoryRoute.js";
import subcategoryRoute from "./modules/subcategory/routes/subcategoryRoute.js";
import productRoute from "./modules/product/routes/productRoute.js";
import rankRoute from "./modules/rank/routes/rankRoute.js";
import userRoute from "./modules/user/routes/userRoute.js";
import categoryAdminRoute from "./modules/category/routes/admin/categoryRoute.js";
import subcategoryAdminRoute from "./modules/subcategory/routes/admin/subcategoryRoute.js";
import achievementAdminRoutes from "./modules/achievement/routes/admin/achievementRoutes.js";
import creatorRouteAdmin from "./modules/creator/routes/admin/creatorRoute.js";
import rankAdminRoute from "./modules/rank/routes/admin/rankRoute.js";
import { UPLOAD_ROOT } from "./config/storage.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(UPLOAD_ROOT));

app.use("/api/auth", authRoute);

app.use("/api/creators", creatorRoute);

app.use("/api/profile", profileRoute);

app.use("/api/achievements", achievementRoutes);

app.use("/api/products", productRoute);

app.use("/api/categories", categoryRoute);

app.use("/api/subcategories", subcategoryRoute);

app.use("/api/ranks", rankRoute);

// Admin Routes

app.use("/api/admin/achievements", achievementAdminRoutes);

app.use("/api/admin/categories", categoryAdminRoute);

app.use("/api/admin/creators", creatorRouteAdmin);

app.use("/api/admin/ranks", rankAdminRoute);

app.use("/api/admin/subcategories", subcategoryAdminRoute);

app.use("/api/admin/users", userRoute);

export default app;
