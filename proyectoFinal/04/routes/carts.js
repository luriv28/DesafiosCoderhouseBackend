import { Router } from "express";
import { validMongoId } from "../middlewares/validationMiddleware.js";
import CartsControllers from "../controllers/carts.js";

const cartsRouter = Router();
const Controllers = new CartsControllers();

cartsRouter.get("/", Controllers.getCarts);
cartsRouter.get("/:id/productos", validMongoId, Controllers.getProductsInCart);
cartsRouter.post(
  "/:id/productos/:id_producto",
  validMongoId,
  Controllers.postProductInCart
);
cartsRouter.post("/", Controllers.postCart);
cartsRouter.delete(
  "/:id/productos/:id_producto",
  validMongoId,
  Controllers.deleteProductInCart
);
cartsRouter.delete("/:id", validMongoId, Controllers.deleteCart);

export default cartsRouter;
