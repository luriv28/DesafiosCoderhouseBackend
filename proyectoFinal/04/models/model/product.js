export default class Producto {
  id;
  timestamp;
  nombre;
  descripcion;
  codigo;
  foto;
  precio;
  stock;

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
