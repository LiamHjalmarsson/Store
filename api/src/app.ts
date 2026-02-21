import express from "express";
import cors from "cors";
import authRoute from "./routes/auth/authRoute.js";
import userRoute from "./routes/user/userRoute.js";
import creatorRoute from "./routes/creator/creatorRoute.js";
import profileRoute from "./routes/profile/profileRoute.js";
import categoryRoute from "./routes/category/categoryRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/creators", creatorRoute);

app.use("/api/profile", profileRoute);

app.use("/api/categories", categoryRoute);

export default app;
