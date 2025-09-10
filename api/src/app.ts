import express from "express";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

export default app;
