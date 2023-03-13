import { cartContainer } from "../../routes/cart.js";
import { prodContainer } from "../../routes/products.js";

export async function deleteCart(req, res) {
  const id = await cartContainer.deleteById(req.params.id);
  res.status(200).json({ status: "ok", deletedCart: id });
}

export async function deleteProductInCart(req, res) {
  const { id, id_prod } = req.params;
  const cart = await cartContainer.getById(id);

  // I ITTERATE INSIDE THE PRODUCTS, AND WHEN I FOUND ONE (IT COULD HAVE MORE THAN ONE), I DELETED IT, AND BREAK THE LOOP
  let i = 0;
  while (i < cart[0].productos.length) {
    if (cart[0].productos[i]._id == id_prod) {
      cart[0].productos.splice(i, 1);
      break;
    }
    i++;
  }

  // I UPDATE THE CART WITH THE UPDATED PRODUCTS ARRAY.
  const updatedCartId = await cartContainer.update(id, cart[0]);
  console.log(updatedCartId);
  res.status(201).json({
    status: "ok",
    updatedCart: updatedCartId,
    productDeletedId: id_prod,
  });
}

export async function getProductsInCart(req, res) {
  const cart = await cartContainer.getById(req.params.id);
  res.status(200).json(cart[0].productos);
}

export async function postCart(req, res) {
  const newCart = { timestamp: Date.now(), productos: [] };
  const idNew = await cartContainer.save(newCart);
  res.status(201).json({ status: "ok", newCartId: idNew });
}

export async function postProductInCart(req, res) {
  const cartId = req.params.id;
  const productId = req.params.id_prod;

  const cart = (await cartContainer.getById(cartId))[0];
  const product = (await prodContainer.getById(productId))[0];

  cart.productos.push(product);

  const updatedCartId = await cartContainer.update(cartId, cart);
  res
    .status(201)
    .json({ status: "ok", updatedCart: updatedCartId, productAdded: product });
}
