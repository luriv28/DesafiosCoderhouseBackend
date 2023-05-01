import { admin } from "../server.js";

export function isAdmin(req, res, next) {
  admin
    ? next()
    : res.status(401).json({
        error: -4,
        descripcion: "The route in your petition is not authorized",
        route: req.originalUrl,
      });
}
