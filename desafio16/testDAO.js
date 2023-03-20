import MensajesRepo from "./repos/mensajesRepo.js";

const mensajes = new MensajesRepo();

await mensajes.save({
  email: "lucas@lucas.com",
  name: "Luke",
  lastname: "Riv",
  age: 29,
  alias: "Gorgeous",
  avatar: "The Avatar",
  text: "This is the message",
  timestamp: "timestamp",
});
await mensajes.save({
  email: "lucas@lucas.com",
  name: "Luke",
  lastname: "Riv",
  age: 29,
  alias: "Gorgeous",
  avatar: "The Avatar",
  text: "This is the message",
  timestamp: "timestamp",
});
await mensajes.save({
  email: "lucas@lucas.com",
  name: "Luke",
  lastname: "Riv",
  age: 29,
  alias: "Gorgeous",
  avatar: "The Avatar",
  text: "This is the message",
  timestamp: "timestamp",
});
//await mensajes.deleteById(1);
//await mensajes.update(2, {id: 2, email: "2ariel@ariel.com", name: "2Ariel", lastname: "Bruschini", age: 42, alias: "cute", avatar: "el avatar", text: "Este es el mensaje", timestamp: "timestamp"})
const repo = await mensajes.getAll();
console.log("-----------");
console.log(repo.length);
repo.map((p) => console.log(p.verMensaje()));
