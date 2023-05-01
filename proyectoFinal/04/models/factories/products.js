import ProductsDAOMem from "../DAOs/productsDAO_mem.js";
import ProductsDAOMongoose from "../DAOs/productsDAO_mongoose.js";
import { productSchema } from "../schemas/products.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ProductsDAOFactory {
  constructor() {
    if (!ProductsDAOFactory.instance) {
      ProductsDAOFactory.instance = this;
    }
    return ProductsDAOFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new ProductsDAOMongoose(productSchema);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY");
        return new ProductsDAOMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)");
        return new ProductsDAOMem();
        break;
    }
  }
}
