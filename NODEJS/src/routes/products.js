import Express from "express";
import {
  create,
  get,
  getAll,
  remove,
  update,
} from "../controllers/products.js";
import { checkPermission } from "../middlewares/checkPermission.js";
const router = Express.Router();

router.get("/products/:id", get);
router.get("/products", getAll);

router.post("/products", checkPermission, create);
router.put("/products/:id", checkPermission, update);
router.delete("/products/:id", checkPermission, remove);

export default router;
