import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/products";
import categoryRouter from "./routes/categories";
import authtRouter from "./routes/auth";
import uploadRouter from "./routes/upload";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routers
app.use("/api", productRouter);
app.use("/api", authtRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.get("/search", (req, res) => {
  console.log(req.query.q);
  res.render("seacrh");
});

// connect
mongoose
  .connect("mongodb://localhost:27017/assignment")
  .then(() => console.log("Db is connecting"))
  .catch(() => console.log("Failed connect"));

export const viteNodeApp = app;
