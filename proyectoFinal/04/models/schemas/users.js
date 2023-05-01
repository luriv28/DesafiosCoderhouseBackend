import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const usersCollName = "users";

const usersSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  timestamp: { type: String, require: true, max: 30 },
  email: { type: String, require: true, max: 30 },
  nombre: { type: String, require: true, max: 20 },
  direccion: { type: String, require: true, max: 200 },
  edad: { type: Number, require: true },
  telefono: { type: String, require: true, max: 50 },
  foto: { type: String, require: true, max: 400 },
  carritoId: { type: String, require: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

const connection = mongoose.createConnection(process.env.MONGO_DB_STRING_CONN, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const users = connection.model(usersCollName, usersSchema);
