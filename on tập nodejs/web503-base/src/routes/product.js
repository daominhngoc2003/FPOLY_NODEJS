import express from "express";
import { create, get, getAll, remove, update } from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.put("/products/:id", update);
router.post("/products", checkPermission, create);
router.delete("/products/:id", remove);

export default router;
