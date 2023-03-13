import express from "express";
//import Container from "../models/Container.js";
import { mongoContainer } from "../models/mongoContainer.js";
import { carts } from "../models/schemas/carts.js";
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
import { validId } from "../controllers/products/productsValidations.js";

const { Router } = express;
const cartRouter = Router();

export const cartContainer = new mongoContainer(carts);

cartRouter.delete("/:id?", validId, existsCart, deleteCart);

cartRouter.post("/", postCart);

cartRouter.get("/:id/productos", validId, existsCart, getProductsInCart);

cartRouter.post(
  "/:id/productos/:id_prod",
  validId,
  existsCart,
  existsProductForCartPost,
  postProductInCart
);

cartRouter.delete(
  "/:id/productos/:id_prod",
  validId,
  existsCart,
  existsProductInCart,
  deleteProductInCart
);

export default cartRouter;
