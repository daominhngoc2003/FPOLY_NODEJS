import express from "express";
import { create, get, getAll, remove, update } from "../controller/product";
import { checkPermission } from "../middleware/checkPermission";
const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products", checkPermission, create);
router.put("/products/:id", checkPermission, update);
router.delete("/products", checkPermission, remove);

export default router;
