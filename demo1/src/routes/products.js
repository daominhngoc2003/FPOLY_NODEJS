import Express from "express";
import { create, get, getAll, remove, update } from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";

const router = Express.Router();

router.get("/products", getAll);
router.post("/products", checkPermission, create);
router.delete("/products/:id", checkPermission, remove);
router.get("/products/:id", get);
router.put("/products/:id", checkPermission, update);

export default router;
