import util from "util";
import { normalize, schema } from "normalizr";
const mensajes = {
  id: "backendCoder9",
  messages: [
    {
      author: {
        email: "lucasesteban.r@gmail.com",
        nombre: "Lucas",
        apellido: "Riv",
        edad: "29",
        alias: "Gorgeous",
        avatar: "http://luqui.jpg",
      },
      dateAndTime: "18/1/2023, 19:18:10",
      text: "Este es el primer mensaje de Lu",
      id: 0,
    },
    {
      author: {
        email: "lucasesteban.r@gmail.com",
        nombre: "Lucas",
        apellido: "Riv",
        edad: "29",
        alias: "Gorgeous",
        avatar: "http://luqui.jpg",
      },
      dateAndTime: "18/1/2023, 19:22:10",
      text: "Este es el segundo mensaje de Lu",
      id: 1,
    },
    {
      author: {
        email: "cris@gmail.com",
        nombre: "Cris",
        apellido: "Rob",
        edad: "45",
        alias: "Treacher",
        avatar: "http://cris.jpg",
      },
      dateAndTime: "18/1/2023, 19:41:45",
      text: "Mensaje de Cris",
      id: 2,
    },
  ],
};
console.log(JSON.stringify(mensajes));

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

// SCHEMAS

const authorSchema = new schema.Entity("author", {}, { idAttribute: "email" });

const messageSchema = new schema.Entity("message", {
  author: authorSchema,
});

const messagesSchema = new schema.Entity("messages", {
  messages: [messageSchema],
});

const messagesNorm = normalize(mensajes, messagesSchema);
print(messagesNorm);
