import express from "express";
import mongoose from "mongoose";
import product from "./routes/product";
import user from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api", product);
app.use("/api", user);

mongoose
  .connect(`mongodb://localhost:27017/bai-thi`)
  .then(() => console.log("db connectting"))
  .catch(() => console.log("failed connect"));

export const viteNodeApp = app;
