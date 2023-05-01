export default class Order {
  id;
  timestamp;
  usuario;
  carrito;

  constructor({ id, timestamp, usuario, carrito }) {
    this.id = id;
    this.timestamp = timestamp;
    this.usuario = usuario;
    this.carrito = carrito;
  }
}
