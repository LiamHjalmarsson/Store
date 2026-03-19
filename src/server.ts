/* eslint-disable no-console */
import config from "./config/config.js";
import app from "./app.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use(errorHandler);

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`);
});
