import { Router } from "express";
import { getProductosTest } from "../handlers/productsHandlers.js";
import { isAuth } from "./authMiddleware.js";

const productsRouter = Router();

productsRouter.get("/productos-test", isAuth, getProductosTest);

//PARA PROBAR EL LOG DEL ERROR
productsRouter.get("/testError", (req, res) => {
  try {
    throw new Error("Este es un error para loguear");
  } catch (error) {
    req.logError(error);
  }
  res.redirect("/info");
});

export default productsRouter;
