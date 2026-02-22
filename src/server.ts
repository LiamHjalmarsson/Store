import config from "./config/config.js";
import app from "./app.js";

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(config.port, () => {
	console.log(`Server is running on http://localhost:${config.port}`);
});
