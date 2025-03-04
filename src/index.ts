import express from "express";
import authRouter from "./routes/index.js";
import { runMigrations } from "./db/migrations.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", authRouter);

runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
