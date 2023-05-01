import CartsServices from "../services/carts.js";
import * as dotenv from "dotenv";
dotenv.config();

const Services = new CartsServices();

export default class CartsControllers {
  async postCart(req, res) {
    const idNew = await Services.postCart();
    res.status(201).json({ status: "ok", newCartId: idNew });
  }

  async getCarts(req, res) {
    const carts = await Services.getCarts();
    res.status(200).json(carts);
  }

  async deleteCart(req, res) {
    const id = req.params.id;
    const deletedId = await Services.deleteById(id);
    res.status(200).json({ status: "ok", deletedCart: deletedId });
  }

  async deleteProductInCart(req, res) {
    const cartId = req.params.id;
    const productId = req.params.id_producto;
    const updatedCart = await Services.deleteProductInCart(cartId, productId);
    res.status(201).json(updatedCart);
  }

  async getProductsInCart(req, res) {
    const id = req.params.id;
    const products = await Services.getProductsInCart(id);
    res.status(200).json(products);
  }

  async postProductInCart(req, res) {
    const cartId = req.params.id;
    const productId = req.params.id_producto;
    const updatedCart = await Services.postProductInCart(cartId, productId);
    return updatedCart
      ? res.status(201).json(updatedCart)
      : res.json({ status: "No existe producto o carrito con ese ID" });
  }
}
