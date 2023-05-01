import * as dotenv from "dotenv";
import { isMongoId } from "../helpers/generalValidations.js";
dotenv.config();

export function validMongoId(req, res, next) {
  const { id, id_producto } = req.params;

  if (process.env.PERSISTENCE == "mongo") {
    if (id && !isMongoId(id)) {
      res.status(200).json({ status: "No mongo id" });
      return;
    }
    if (id_producto && !isMongoId(id_producto)) {
      res.status(200).json({ status: "No mongo id" });
      return;
    }
  }

  next();
}
