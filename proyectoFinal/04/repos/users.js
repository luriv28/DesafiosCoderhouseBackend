import User from "../models/model/user.js";
import UsersDAOFactory from "../models/factories/users.js";
import { transformarADTO_Users } from "../models/DTOs/userDTO.js";

export default class UsersRepo {
  constructor() {
    this.factory = new UsersDAOFactory();
    this.dao = this.factory.getDao();
  }

  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new User(dto));
  }

  async getById(id) {
    const dto = await this.dao.getById(id);
    return new User(dto);
  }

  async getByEmail(email) {
    const dto = await this.dao.getByEmail(email);
    if (dto) {
      return new User(dto);
    } else {
      return null;
    }
  }

  async save(user) {
    const dto = transformarADTO_Users(user);
    const saved = await this.dao.save(dto);
    return new User(saved);
  }

  async deleteAll() {
    await this.dao.deleteAll();
  }

  async deleteById(id) {
    const removed = await this.dao.deleteById(id);
    return removed;
  }

  async update(id, user) {
    const updated = await this.dao.update(id, transformarADTO_Users(user));
    return new User(updated);
  }
}
