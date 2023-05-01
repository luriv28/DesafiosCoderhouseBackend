import OrdersDAOMongoose from "../DAOs/ordersDAO_mongoose.js";
import { ordersSch } from "../schemas/orders.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class OrdersDAOFactory {
  constructor() {
    if (!OrdersDAOFactory.instance) {
      OrdersDAOFactory.instance = this;
    }
    return OrdersDAOFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new OrdersDAOMongoose(ordersSch);
        break;
    }
  }
}
