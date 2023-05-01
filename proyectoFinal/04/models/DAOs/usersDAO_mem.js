import { transformarADTO_Users } from "../DTOs/userDTO.js";

export default class UsersDAOMem {
  constructor() {
    if (!UsersDAOMem.instance) {
      UsersDAOMem.instance = this;
      this.users = [];
    }
    return UsersDAOMem.instance;
  }

  #generateID() {
    return String(Date.now() + Math.floor(Math.random() * 100));
  }

  #getIndex(id) {
    return this.users.findIndex((p) => p.id == id);
  }

  #getIndexByEmail(email) {
    return this.users.findIndex((p) => p.email == email);
  }

  getAll() {
    return transformarADTO_Users(this.users);
  }

  getById(id) {
    let find = this.productos[this.#getIndex(id)];
    return find
      ? transformarADTO_Users(this.productos[this.#getIndex(id)])
      : null;
  }

  getByEmail(email) {
    try {
      let find = this.users[this.#getIndexByEmail(email)];
      if (find) {
        return transformarADTO_Users(find);
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  save(object) {
    object.id = this.#generateID();
    this.users.push(object);
    return object;
  }

  deleteById(id) {
    const deleted = transformarADTO_Users(
      this.users.splice(this.#getIndex(id), 1)
    );
    return id;
  }

  deleteAll() {
    this.users = [];
  }

  update(id, producto) {
    const updated = { ...this.users[this.#getIndex(id)], ...producto };
    this.users.splice(this.#getIndex(id), 1, updated);
    return transformarADTO_Users(updated);
  }
}
