import CartsDAOMem from "../DAOs/cartsDAO_mem.js";
import CartsDAOMongoose from "../DAOs/cartsDAO_mongoose.js";
import { cartsSch } from "../schemas/carts.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class CartsDAOFactory {
  constructor() {
    if (!CartsDAOFactory.instance) {
      CartsDAOFactory.instance = this;
    }
    return CartsDAOFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new CartsDAOMongoose(cartsSch);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY");
        return new CartsDAOMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)");
        return new CartsDAOMem();
        break;
    }
  }
}
