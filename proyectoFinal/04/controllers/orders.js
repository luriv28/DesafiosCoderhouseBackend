import OrdersServices from "../services/orders.js";
import * as dotenv from "dotenv";
dotenv.config();

const Services = new OrdersServices();

export default class OrdersControllers {
  async postOrder(req, res) {
    const { userId } = req.params;
    const order = await Services.postOrder(userId);
    res.status(200).json(order);
  }
}
