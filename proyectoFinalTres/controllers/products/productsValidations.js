import { prodContainer } from "../../routes/products.js";

export function validId(req, res, next) {
  req.params.id != undefined && req.params.id.length != 24
    ? res.status(401).json({ error: -3, descripcion: "This is not a valid ID" })
    : next();
}

export function existsProduct(req, res, next) {
  prodContainer.getById(req.params.id) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exist" })
    : next();
}
