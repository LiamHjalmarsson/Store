import config from "./config/config.js";
import app from "./app.js";

import authRoute from "./routes/authRoute.js";

app.use("/api/auth", authRoute);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`);
});
