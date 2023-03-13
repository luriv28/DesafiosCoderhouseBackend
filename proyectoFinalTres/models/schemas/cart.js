import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const cartsCollName = "carts";

const cartsSchema = new mongoose.Schema({
  timestamp: { type: String, require: true, max: 30 },
  productos: { type: Array, require: true, max: 150 },
});

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export const carts = mongoose.model(cartsCollName, cartsSchema);
export const carts = connection.model(cartsCollName, cartsSchema);
