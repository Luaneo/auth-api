import express from "express";
import authRouter from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
