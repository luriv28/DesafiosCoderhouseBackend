import mongoose from "mongoose";

const productsCollName = "products";

const productsSchema = new mongoose.Schema({
  timestamp: { type: String, require: true, max: 30 },
  nombre: { type: String, require: true, max: 150 },
  descripcion: { type: String, require: true, max: 500 },
  codigo: { type: String, require: true, max: 10 },
  foto: { type: String, require: true, max: 200 },
  precio: { type: Number, require: true },
  stock: { type: Number, require: true },
});

export const products = mongoose.model(productsCollName, productsSchema);
