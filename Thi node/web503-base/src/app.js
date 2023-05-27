import express from "express";
import mongoose from "mongoose";
import product from "./routes/product";
import auth from "./routes/auth";

const app = express();

app.use(express.json());
app.use("/api", product);
app.use("/api", auth);

mongoose.connect(`mongodb://localhost:27017/bai-thi`);

export const viteNodeApp = app;
