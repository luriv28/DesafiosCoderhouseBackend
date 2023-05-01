import Order from "../models/model/order.js";
import OrdersDAOFactory from "../models/factories/orders.js";
import { transformarADTO_Orders } from "../models/DTOs/orderDTO.js";

export default class OrdersRepo {
  constructor() {
    this.factory = new OrdersDAOFactory();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Order(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Order(dto) : null;
  }

  async save(order) {
    const dto = transformarADTO_Orders(order);
    const saved = await this.dao.save(dto);
    return new Order(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, order) {
    const updated = await this.dao.update(id, transformarADTO_Orders(order));
    return new Order(updated);
  }
}
