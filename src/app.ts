import express from "express";
import cors from "cors";
import authRoute from "./modules/auth/routes/authRoute.js";
import userRoute from "./modules/user/routes/userRoute.js";
import creatorRoute from "./modules/creator/routes/creatorRoute.js";
import profileRoute from "./modules/profile/routes/profileRoute.js";
import achievementRoutes from "./modules/achievements/routes/achievementRoutes.js";
import achievementAdminRoutes from "./modules/achievements/routes/admin/achievementRoutes.js";
import categoryRoute from "./modules/category/routes/categoryRoute.js";
import categoryAdminRoute from "./modules/category/routes/admin/categoryRoute.js";
import subcategoryRoute from "./modules/subcategory/routes/subcategoryRoute.js";
import subcategoryAdminRoute from "./modules/subcategory/routes/admin/subcategoryRoute.js";
import productRoute from "./modules/products/routes/productRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/creators", creatorRoute);

app.use("/api/profile", profileRoute);

app.use("/api/achievements", achievementRoutes);

app.use("/api/products", productRoute);

app.use("/api/categories", categoryRoute);

app.use("/api/subcategories", subcategoryRoute);

app.use("/api/admin/users", userRoute);

app.use("/api/admin/categories", categoryAdminRoute);

app.use("/api/admin/subcategories", subcategoryAdminRoute);

app.use("/api/admin/achievements", achievementAdminRoutes);

export default app;
