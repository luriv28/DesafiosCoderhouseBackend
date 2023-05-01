import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO_Users } from "../DTOs/userDTO.js";

export default class UsersDAOMongoose {
  constructor(model) {
    this.model = model;
  }

  #replaceIDfor_ID(obj) {
    obj["_id"] = obj["id"];
    delete obj["id"];
    return obj;
  }

  #generateDAOCompatible(mongooseOBJ) {
    if (Array.isArray(mongooseOBJ)) {
      return mongooseOBJ.map((m) => {
        return {
          id: m._id,
          timestamp: m.timestamp,
          email: m.email,
          nombre: m.nombre,
          direccion: m.direccion,
          edad: m.edad,
          telefono: m.telefono,
          foto: m.foto,
          carritoId: m.carritoId,
          hash: m.hash,
          salt: m.salt,
        };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        timestamp: mongooseOBJ.timestamp,
        email: mongooseOBJ.email,
        nombre: mongooseOBJ.nombre,
        direccion: mongooseOBJ.direccion,
        edad: mongooseOBJ.edad,
        telefono: mongooseOBJ.telefono,
        foto: mongooseOBJ.foto,
        carritoId: mongooseOBJ.carritoId,
        hash: mongooseOBJ.hash,
        salt: mongooseOBJ.salt,
      };
    }
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarADTO_Users(this.#generateDAOCompatible(saved));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS NULL
    try {
      let find = await this.model.findOne({ _id: id });
      return find
        ? transformarADTO_Users(
            this.#generateDAOCompatible(await this.model.findOne(find))
          )
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getByEmail(email) {
    // WHEN NO ROW IS FOUND RETURNS NULL
    try {
      let find = await this.model.findOne({ email: email });
      return find
        ? transformarADTO_Users(
            this.#generateDAOCompatible(await this.model.findOne(find))
          )
        : null;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, newObject) {
    try {
      this.#replaceIDfor_ID(newObject);
      await this.model.updateOne({ _id: id }, newObject);
      return transformarADTO_Users({ id: id, ...newObject });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      const productos = await this.model.find();
      return transformarADTO_Users(this.#generateDAOCompatible(productos));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      await this.model.deleteOne({ _id: id });
      return id;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    }
  }
}
