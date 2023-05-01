import Cart from "../models/model/carts.js";
import CartsDAOFactory from "../models/factories/carts.js";
import { transformarADTO_Carts } from "../models/DTOs/cartDTO.js";

export default class CartsRepo {
  constructor() {
    this.factory = new CartsDAOFactory();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Cart(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Cart(dto) : null;
  }

  async save(cart) {
    const dto = transformarADTO_Carts(cart);
    const saved = await this.dao.save(dto);
    return new Cart(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, cart) {
    const updated = await this.dao.update(id, transformarADTO_Carts(cart));
    return new Cart(updated);
  }
}
