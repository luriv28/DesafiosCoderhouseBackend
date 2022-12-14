import { prodContainer } from "../../routes/products.js";

export function validId(req, res, next) {
  prodContainer.getById(req.params.id) == null && req.params.id != null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}

export function existsProduct(req, res, next) {
  prodContainer.getById(req.params.id) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}
