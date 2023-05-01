import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export class mongoContainer {
  constructor(model) {
    this.model = model;
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      const saveModel = new this.model(object);
      return await saveModel.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      return this.model.find({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, newObject) {
    try {
      return await this.model.updateOne({ _id: id }, newObject);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY COLLECTION
    try {
      return await this.model.find();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    // RETURNS LIKE THIS OBJ { acknowledged: true, deletedCount: 1 }
    try {
      return await this.model.deleteOne({ _id: id });
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
