import express from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products.js";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import categoryRouter from ".//routes/categories";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
// DB connection
mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("DB is connected"))
  .catch(() => {
    console.log("Connect failed");
  });

export const viteNodeApp = app;
