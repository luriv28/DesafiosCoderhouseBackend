import { transformarADTO } from "../DTO/productosDTO.js";

export default class ProductosDAOMem {
  constructor() {
    this.productos = [];
  }

  #getIndex(id) {
    return this.productos.findIndex((p) => p.id == id);
  }

  getAll() {
    return transformarADTO(this.productos);
  }

  getById(id) {
    return transformarADTO(this.productos[this.#getIndex(id)]);
  }

  save(object) {
    this.productos.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarADTO(
      this.productos.splice(this.#getIndex(id), 1)
    );
    return deleted;
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
