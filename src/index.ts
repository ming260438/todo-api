import "dotenv/config";
import express from "express";
import todosRouter from "./routes/todos";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const APP_NAME = process.env.APP_NAME ?? "Todo API";
const APP_VERSION = process.env.APP_VERSION ?? "1.0.0";

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: `${APP_NAME} is running`, version: APP_VERSION });
});

app.use("/todos", todosRouter);

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on http://localhost:${PORT}`);
});

export default app;
