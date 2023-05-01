import { transformarADTO } from "../DTOs/productDTO.js";

export default class ProductsDAOMem {
  constructor() {
    if (!ProductsDAOMem.instance) {
      ProductsDAOMem.instance = this;
      this.productos = [];
    }
    return ProductsDAOMem.instance;
  }

  #generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  #getIndex(id) {
    return this.productos.findIndex((p) => p.id == id);
  }

  getAll() {
    return transformarADTO(this.productos);
  }

  getById(id) {
    let find = this.productos[this.#getIndex(id)];
    return find ? transformarADTO(this.productos[this.#getIndex(id)]) : null;
  }

  save(object) {
    object.id = this.#generateID();
    this.productos.push(object);
    return object;
  }

  deleteById(id) {
    let find = this.productos[this.#getIndex(id)];
    return find
      ? transformarADTO(this.productos.splice(this.#getIndex(id), 1))
      : null;
  }

  deleteAll() {
    this.productos = [];
  }

  update(id, producto) {
    const updated = { ...this.productos[this.#getIndex(id)], ...producto };
    this.productos.splice(this.#getIndex(id), 1, updated);
    return transformarADTO(updated);
  }
}
