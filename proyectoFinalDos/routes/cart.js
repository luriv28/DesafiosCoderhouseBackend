import express from "express";
import Container from "../models/Container.js";
import {
  postCart,
  deleteCart,
  getProductsInCart,
  postProductInCart,
  deleteProductInCart,
} from "../controllers/carts/cartsHandlers.js";
import {
  existsCart,
  existsProductForCartPost,
  existsProductInCart,
} from "../controllers/carts/cartsValidations.js";

const { Router } = express;
const cartRouter = Router();

export const cartContainer = new Container("./data/carts.txt");

cartRouter.delete("/:id?", existsCart, deleteCart);

cartRouter.post("/", postCart);

cartRouter.get("/:id/productos", existsCart, getProductsInCart);

cartRouter.post(
  "/:id/productos/:id_prod",
  existsCart,
  existsProductForCartPost,
  postProductInCart
);

cartRouter.delete(
  "/:id/productos/:id_prod",
  existsCart,
  existsProductInCart,
  deleteProductInCart
);

export default cartRouter;
