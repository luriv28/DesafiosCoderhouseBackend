import { transformarADTO_Carts } from "../DTOs/cartDTO.js";

export default class CartsDAOMem {
  constructor() {
    if (!CartsDAOMem.instance) {
      CartsDAOMem.instance = this;
      this.carts = [];
    }
    return CartsDAOMem.instance;
  }

  #generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  #getIndex(id) {
    return this.carts.findIndex((p) => p.id == id);
  }

  getAll() {
    return transformarADTO_Carts(this.carts);
  }

  getById(id) {
    return transformarADTO_Carts(this.carts[this.#getIndex(id)]);
  }

  save(object) {
    object.id = this.#generateID();
    this.carts.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarADTO_Carts(
      this.carts.splice(this.#getIndex(id), 1)
    );
    return id;
  }

  deleteAll() {
    this.carts = [];
  }

  update(id, producto) {
    const updated = { ...this.carts[this.#getIndex(id)], ...producto };
    this.carts.splice(this.#getIndex(id), 1, updated);
    return transformarADTO_Carts(updated);
  }
}
