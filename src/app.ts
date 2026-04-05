import express from "express";
import cors from "cors";
import { UPLOAD_ROOT } from "./config/storage.js";
import apiRoutes from "./routes/apiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import achievementRoutes from "./modules/achievement/routes/index.js";
import authRoutes from "./modules/auth/routes/authRoute.js";
import categoriesRoutes from "./modules/category/routes/index.js";
import creatorRoutes from "./modules/creator/routes/index.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(UPLOAD_ROOT));

app.use("/api", apiRoutes);

app.use("/api", achievementRoutes);

app.use("/api", authRoutes);

app.use("/api", categoriesRoutes);

app.use("/api", creatorRoutes);

app.use("/api/admin", adminRoutes);

export default app;
