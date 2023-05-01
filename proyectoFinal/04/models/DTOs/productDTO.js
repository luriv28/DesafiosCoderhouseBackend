export default class ProductDTO {
  constructor({
    id,
    timestamp,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }
}

export function transformarADTO(products) {
  if (Array.isArray(products)) {
    return products.map((product) => new ProductDTO(product));
  } else {
    return new ProductDTO(products);
  }
}
