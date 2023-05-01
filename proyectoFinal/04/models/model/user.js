export default class User {
  id;
  timestamp;
  email;
  nombre;
  direccion;
  edad;
  telefono;
  foto;
  carritoId;
  hash;
  salt;

  constructor({
    id,
    timestamp,
    email,
    nombre,
    direccion,
    edad,
    telefono,
    foto,
    carritoId,
    hash,
    salt,
  }) {
    this.id = id;
    this.timestamp = timestamp;
    this.email = email;
    this.nombre = nombre;
    this.direccion = direccion;
    this.edad = edad;
    this.telefono = telefono;
    this.foto = foto;
    this.carritoId = carritoId;
    this.hash = hash;
    this.salt = salt;
  }
}
