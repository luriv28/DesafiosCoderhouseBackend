import express from "express";
import { mongoContainer } from "../models/mongoContainer.js";
import { products } from "../models/schemas/products.js";
import { isAdmin } from "../helpers/generalValidations.js";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/products/productsHandlers.js";

import {
  validId,
  existsProduct,
} from "../controllers/products/productsValidations.js";

const { Router } = express;
const prodRouter = Router();

export const prodContainer = new mongoContainer(products);

prodRouter.get("/:id?", validId, getProducts);

prodRouter.post("/", isAdmin, postProducts);

prodRouter.put("/:id", isAdmin, existsProduct, putProducts);

prodRouter.delete("/:id", isAdmin, existsProduct, deleteProducts);

export default prodRouter;
