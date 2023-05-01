import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error) => {
      if (error) return res.json({ status: "Error de Token" });
      next();
    });
  } else {
    res.json({ status: "No estas logueado" });
  }
}
