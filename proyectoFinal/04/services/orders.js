import OrdersRepo from "../repos/orders.js";
import UsersRepo from "../repos/users.js";
import CartsRepo from "../repos/carts.js";
import { sendEmailOrder } from "../helpers/sendEmailUtils.js";
import { sendOrder } from "../helpers/sendSmsUtils.js";

const ordersR = new OrdersRepo();
const usersR = new UsersRepo();
const cartsR = new CartsRepo();

export default class OrdersServices {
  async postOrder(userId) {
    const user = await usersR.getById(userId);
    if (!user) return null;
    const cart = await cartsR.getById(user.carritoId);

    const newOrder = {
      timestamp: Date.now(),
      usuario: user,
      carrito: { ...cart }, //SPRED TO COPY
    };

    const postOrder = await ordersR.save(newOrder);
    postOrder.carrito.productos = postOrder.carrito.productos.map(
      (prod) => prod
    );

    //EMPTY CART AND UPDATE.
    cart.productos = [];
    await cartsR.update(cart.id, cart);

    // SEND EMAIL
    if (process.env.SEND_EMAIL_SUPPORT == "true") {
      try {
        const buyedProducts = cart.productos
          .map((producto) => {
            return `${producto.nombre} - ${producto.precio}`;
          })
          .join("<br>");
        const html = `<h1>Nuevo Pedido</h1>
                ${buyedProducts}`;
        await sendEmailOrder(html, user.nombre, user.email);
      } catch (error) {
        console.log(error);
      }
    }

    //TWILLIO SUPPORT
    if (process.env.TWILIO_SUPPORT == "true") {
      try {
        //SEND WHATSAPP
        const waMessage = {
          body: "Su pedido ha sido recibido y se encuentra en proceso",
          from: "whatsapp:" + process.env.TWILIO_REG_PHONE_WHATSAPP,
          to: "whatsapp:+5491140328110", // IF TWILLIO ACCOUNT IS PAID WE SHOULD PUT HERE user.telefono
        };
        await sendOrder(waMessage);

        // SEND SMS
        const smsMessage = {
          body: "Su pedido ha sido recibido y se encuentra en proceso",
          from: process.env.TWILIO_REG_PHONE_SMS,
          to: "+5491137924505", // IF TWILLIO ACCOUNT IS PAID WE SHOULD PUT HERE user.telefono
        };
      } catch (error) {
        console.log(error);
      }
    }

    return postOrder;
  }
}
