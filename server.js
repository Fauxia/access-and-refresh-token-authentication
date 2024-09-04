import express from "express";
import { config } from "dotenv";
import { connectToDb } from "./db/db.js";
import { router } from "./routes/auth.js";
import { refreshTokenRouter } from "./routes/refreshToken.js";

const app = express();

config();

app.use(express.json());

app.use("/api", router);
app.use("/api/refreshToken", refreshTokenRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Listning at PORT ${PORT}`);
});
