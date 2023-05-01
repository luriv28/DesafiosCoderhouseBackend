import UsersRepo from "../repos/users.js";
import { validPasword, genPassword } from "../helpers/passwordUtils.js";
import CartsRepo from "../repos/carts.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { sendEmailRegistration } from "../helpers/sendEmailUtils.js";
dotenv.config();

const usersR = new UsersRepo();
const cartsR = new CartsRepo();

export class UsersServices {
  async register(userData) {
    try {
      const user = await usersR.getByEmail(userData.email);
      if (user) {
        return { status: "El usuario ya existe" };
      }
      // GENERATE PASSWORD
      const { salt, hash } = genPassword(userData.password);

      // GENERATE CART SAVE ID
      const newCart = { timestamp: Date.now(), productos: [] };
      const userCartId = (await cartsR.save(newCart)).id.toString();

      // GENERATE NEW COMPLETE USER
      const newUser = {
        timestamp: Date.now(),
        email: userData.email,
        nombre: userData.nombre,
        direccion: userData.direccion,
        edad: userData.edad,
        telefono: userData.telefono,
        foto: userData.foto,
        carritoId: userCartId,
        hash: hash,
        salt: salt,
      };

      // SEND EMAIL REGISTRATION
      process.env.SEND_EMAIL_SUPPORT == "true"
        ? sendEmailRegistration(`<h1>Nuevo registro</h1>
      <p>Datos<br>Nombre: ${userData.nombre}
      <br>Email: ${userData.email}
      </p>`)
        : null;

      return await usersR.save(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const user = await usersR.getByEmail(email);
      if (!user) {
        return { status: "El usuario no existe" };
      } else if (validPasword(password, user.hash, user.salt)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TOKEN_DURATION,
        });
        return { token: token, userId: user.id };
      } else {
        return { status: "La clave es incorrecta" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    return await usersR.getAll();
  }
}
