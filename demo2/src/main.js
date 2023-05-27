import express, { json } from "express";
import dotenv from "dotenv";
import ProductRouter from "./routes/products.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(ProductRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export const viteNodeApp = app;
