export default class OrderDTO {
  constructor({ id, timestamp, usuario, carrito }) {
    (this.id = id),
      (this.timestamp = timestamp),
      (this.usuario = usuario),
      (this.carrito = carrito);
  }
}

export function transformarADTO_Orders(orders) {
  if (Array.isArray(orders)) {
    return orders.map((order) => new OrderDTO(order));
  } else {
    return new OrderDTO(orders);
  }
}
