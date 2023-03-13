import { cartContainer } from "../../routes/cart.js";
import { userContainer } from "../../routes/user.js";
import { sendEmailOrder } from "../../helpers/sendEmailUtils.js";
import { sendOrder } from "../../helpers/sendSmsUtils.js";

export async function getAllData(req, res) {
  const user = await userContainer.getById(req.session.passport.user);
  const cart = await cartContainer.getById(user[0].carritoId);
  res.json({
    user: user[0],
    cart: cart[0],
  });
}

export async function postPedido(req, res) {
  const user = await userContainer.getById(req.session.passport.user);
  const cart = await cartContainer.getById(user[0].carritoId);

  // SEND EMAIL
  const buyedProducts = cart[0].productos
    .map((producto) => {
      return `${producto.nombre} - ${producto.precio}`;
    })
    .join("<br>");

  const html = `<h1>Nuevo Pedido</h1>
    ${buyedProducts}`;

  await sendEmailOrder(html, user[0].nombre, user[0].email);

  //SEND WHATSAPP
  const waMessage = {
    body: "Su pedido ha sido recibido y se encuentra en proceso",
    from: "whatsapp:" + process.env.TWILIO_REG_PHONE_WHATSAPP,
    to: "whatsapp:+5491137924505",
  };

  await sendOrder(waMessage);

  // SEND SMS
  const smsMessage = {
    body: "Su pedido ha sido recibido y se encuentra en proceso",
    from: process.env.TWILIO_REG_PHONE_SMS,
    to: "+5491137924505",
  };

  await sendOrder(smsMessage);

  // RESPONSE
  res.json({
    status: "pedido enviado",
  });
}
