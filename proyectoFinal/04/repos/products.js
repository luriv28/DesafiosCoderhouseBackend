import Producto from "../models/model/product.js";
import ProductsDAOFactory from "../models/factories/products.js";
import { transformarADTO } from "../models/DTOs/productDTO.js";

export default class ProductsRepo {
  constructor() {
    //this.factory = ProductsDAOFactory.getInstance();
    this.factory = new ProductsDAOFactory();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Producto(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return dto ? new Producto(dto) : null;
  }

  async save(producto) {
    const dto = transformarADTO(producto);
    const saved = await this.dao.save(dto);
    return new Producto(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, producto) {
    const updated = await this.dao.update(id, transformarADTO(producto));
    return new Producto(updated);
  }
}
