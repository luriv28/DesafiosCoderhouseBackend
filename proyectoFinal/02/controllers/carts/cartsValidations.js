import { cartContainer } from "../../routes/cart.js";
import { prodContainer } from "../../routes/products.js";

export function existsCart(req, res, next) {
  cartContainer.getById(req.params.id)
    ? next()
    : res
        .status(401)
        .json({ error: -3, descripcion: "This cart doesn't exists" });
}

export function existsProductForCartPost(req, res, next) {
  prodContainer.getById(req.params.id_prod) == null
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}

export function existsProductInCart(req, res, next) {
  const cartProducts = cartContainer.getById(req.params.id).productos;
  const prod = cartProducts.filter((prod) => prod.id == req.params.id_prod);
  prod.length == 0
    ? res
        .status(401)
        .json({
          error: -3,
          descripcion: "This product doesn't exists in this cart",
        })
    : next();
}
