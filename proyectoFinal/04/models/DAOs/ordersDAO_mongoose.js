import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { transformarADTO_Orders } from "../DTOs/orderDTO.js";

// usar el de Carts para el mem

export default class OrdersDAOMongoose {
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
          usuario: m.usuario,
          carrito: m.carrito,
        };
      });
    } else {
      return {
        id: mongooseOBJ._id,
        timestamp: mongooseOBJ.timestamp,
        usuario: mongooseOBJ.usuario,
        carrito: mongooseOBJ.carrito,
      };
    }
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const saveModel = new this.model(object);
      const saved = await saveModel.save();
      return transformarADTO_Orders(this.#generateDAOCompatible(saved));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS NULL
    try {
      let find = await this.model.findOne({ _id: id });
      return find
        ? transformarADTO_Orders(
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
      return transformarADTO_Orders({ id: id, ...newObject });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      const productos = await this.model.find();
      return transformarADTO_Orders(this.#generateDAOCompatible(productos));
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
