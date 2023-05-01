import { cartContainer } from "../../routes/cart.js";
import { prodContainer } from "../../routes/products.js";

export async function existsCart(req, res, next) {
  const cart = await cartContainer.getById(req.params.id);
  cart.length != 0
    ? next()
    : res
        .status(401)
        .json({ error: -3, descripcion: "This cart doesn't exists" });
}

export async function existsProductForCartPost(req, res, next) {
  const product = await prodContainer.getById(req.params.id_prod);
  product.length == 0
    ? res
        .status(401)
        .json({ error: -3, descripcion: "This product doesn't exists" })
    : next();
}

export async function existsProductInCart(req, res, next) {
  const query = await cartContainer.getById(req.params.id);
  const cartProducts = query[0].productos;
  const prod = cartProducts.filter((prod) => prod._id == req.params.id_prod);
  prod.length == 0
    ? res.status(401).json({
        error: -3,
        descripcion: "This product doesn't exist in this cart",
      })
    : next();
}
