class User {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addPet(pet) {
    this.mascotas.push(pet);
  }
  countPets() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getBookNames() {
    let arr = [];
    for (let i = 0; i < this.libros.length; i++) {
      arr.push(this.libros[i].nombre);
    }
    return arr;
  }
}

let Usuario = new User(
  "Lucas",
  "Rivero",
  [
    { nombre: "Eragon", autor: "Christopher Paolini" },
    { nombre: "El Señor de los Anillos", autor: "J.R.R Tolkien" },
  ],
  ["Rukio", "Kira", "Coco", "Morita"]
);

console.log(Usuario.getFullName());
Usuario.addPet("Maui");
console.log(Usuario.countPets());
Usuario.addBook("IT", "Stephen King");
console.log(Usuario.getBookNames());
