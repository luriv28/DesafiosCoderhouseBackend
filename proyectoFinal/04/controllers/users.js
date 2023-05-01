import { UsersServices } from "../services/users.js";
import { isMongoId } from "../helpers/generalValidations.js";
import * as dotenv from "dotenv";
dotenv.config();

const Services = new UsersServices();

export default class UsersControllers {
  async register(req, res) {
    const { email, nombre, direccion, edad, telefono, foto, password } =
      req.body;
    const newUser = {
      timestamp: Date.now(),
      email,
      nombre,
      direccion,
      edad,
      telefono,
      foto,
      password,
    };
    const user = await Services.register(newUser);
    res.json(user);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const token = await Services.login(email, password);
    res.json(token);
  }

  async getUsers(req, res) {
    res.json(await Services.getUsers());
  }
}
