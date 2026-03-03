import express from "express";
import cors from "cors";
import authRoute from "./modules/auth/routes/authRoute.js";
import creatorRoute from "./modules/creator/routes/creatorRoute.js";
import profileRoute from "./modules/profile/routes/profileRoute.js";
import achievementRoutes from "./modules/achievement/routes/achievementRoutes.js";
import categoryRoute from "./modules/category/routes/categoryRoute.js";
import subcategoryRoute from "./modules/subcategory/routes/subcategoryRoute.js";
import productRoute from "./modules/product/routes/productRoute.js";
import admin from "./routes/admin.js";

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

app.use("/api/admin", admin);

export default app;
