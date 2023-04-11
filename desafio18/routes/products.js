import { Router } from "express";
import {
  getProductos,
  postProductos,
  deleteProductos,
  updateProductos,
} from "../services/products.js";
import { isAuth } from "./middlewares/authMiddleware.js";

const productsRouter = Router();

productsRouter.get("/productos", getProductos);
productsRouter.post("/productos", postProductos);
productsRouter.delete("/productos/:id", deleteProductos);
productsRouter.put("/productos/:id", updateProductos);

export default productsRouter;
