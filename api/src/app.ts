import express from "express";
import cors from "cors";
import authRoute from "./modules/auth/routes/authRoute.js";
import userRoute from "./modules/user/routes/userRoute.js";
import creatorRoute from "./modules/creator/routes/creatorRoute.js";
import profileRoute from "./modules/profile/routes/profileRoute.js";
import achievementRoutes from "./modules/achievements/routes/achievementRoutes.js";
import categoryRoute from "./modules/category/routes/categoryRoute.js";
import categoryAdminRoute from "./modules/category/routes/categoryAdminRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/admin/users", userRoute);

app.use("/api/creators", creatorRoute);

app.use("/api/profile", profileRoute);

app.use("/api/achievements", achievementRoutes);

app.use("/api/categories", categoryRoute);

app.use("/api/admin/categories", categoryAdminRoute);

export default app;
