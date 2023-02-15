import { Router } from "express";
import { getProductosTest } from "../handlers/productsHandlers.js";
import { isAuth } from "./authMiddleware.js";

const productsRouter = Router();

productsRouter.get("/productos-test", isAuth, getProductosTest);

export default productsRouter;
