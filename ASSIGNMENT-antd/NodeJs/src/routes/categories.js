import express from "express";
import { create, get, getAll, remove, update } from "../controllers/categories";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();
router.get("/categories", getAll);
router.get("/categories/:id", get);
router.put("/categories/:id", checkPermission, update);
router.delete("/categories/:id", checkPermission, remove);
router.post("/categories", checkPermission, create);

export default router;
