import { Router } from "express";
import { getProductosTest } from "../services/products.js";
import { isAuth } from "./middlewares/authMiddleware.js";

const productsRouter = Router();

productsRouter.get("/productos-test", isAuth, getProductosTest);

export default productsRouter;
