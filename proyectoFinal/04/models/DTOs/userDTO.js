export default class UserDTO {
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

export function transformarADTO_Users(users) {
  if (Array.isArray(users)) {
    return users.map((user) => new UserDTO(user));
  } else {
    return new UserDTO(users);
  }
}
