import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const ordersCollName = "orders";

const ordersSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  timestamp: { type: String, require: true, max: 30 },
  usuario: { type: mongoose.Schema.Types.Mixed },
  carrito: { type: mongoose.Schema.Types.Mixed },
});

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export const carts = mongoose.model(ordersCollName, ordersSchema);
export const ordersSch = connection.model(ordersCollName, ordersSchema);
