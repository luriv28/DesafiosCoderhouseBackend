import { Router } from "express";
import ProductsControllers from "../controllers/products.js";
import { validMongoId } from "../middlewares/validationMiddleware.js";

const productsRouter = Router();
const Controllers = new ProductsControllers();

productsRouter.get("/", Controllers.getProducts);
productsRouter.get("/:id", validMongoId, Controllers.getProductById);
productsRouter.post("/", Controllers.postProduct);
productsRouter.delete("/:id", validMongoId, Controllers.deleteProduct);
productsRouter.put("/:id", validMongoId, Controllers.updateProduct);

export default productsRouter;
