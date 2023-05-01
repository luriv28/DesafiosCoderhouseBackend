export default class CartDTO {
  constructor({ id, timestamp, productos }) {
    (this.id = id), (this.timestamp = timestamp), (this.productos = productos);
  }
}

export function transformarADTO_Carts(carts) {
  if (Array.isArray(carts)) {
    return carts.map((cart) => new CartDTO(cart));
  } else {
    return new CartDTO(carts);
  }
}
