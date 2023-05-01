import CartsRepo from "../repos/carts.js";
import ProductsRepo from "../repos/products.js";

const cartsR = new CartsRepo();
const prodR = new ProductsRepo();

export default class CartsServices {
  async postCart() {
    const cart = { timestamp: Date.now(), productos: [] };
    const newCart = await cartsR.save(cart);
    return newCart.id;
  }

  async getCarts() {
    const carts = await cartsR.getAll();
    return carts;
  }

  async getProductsInCart(id) {
    const cart = await cartsR.getById(id);
    return cart.productos;
  }

  async postProductInCart(cartId, productId) {
    const cart = await cartsR.getById(cartId);
    const product = await prodR.getById(productId);
    if (product && cart) {
      cart.productos.push(product);
      const updatedCart = await cartsR.update(cartId, cart);
      return updatedCart;
    } else {
      return null;
    }
  }

  async deleteProductInCart(cartId, productId) {
    const cart = await cartsR.getById(cartId);
    let flag = false;
    //DELETE ONLY THE FIRST OCURRANCE.
    const newproductos = cart.productos.filter((producto) => {
      if (producto.id == productId && flag == false) {
        flag = true;
        return false;
      }
      return true;
    });
    cart.productos = newproductos;
    const updatedCart = await cartsR.update(cartId, cart);
    return updatedCart;
  }

  async deleteById(id) {
    const removedId = await cartsR.deleteById(id);
    return removedId;
  }
}
